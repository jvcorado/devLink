import './admin.css';

import { Logo } from "../../components/Logo";
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConection';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore';


export const Admin = ()=>{

    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#f1f1f1");
    const [textColorInput, setTextColorInput] = useState("#121212");
    
    const [links, setLinks] = useState([])

    useEffect(()=>{

        const linksRef = collection(db, 'links')
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot)=>{
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push(
                    {
                       id:doc.id,
                       nome:doc.data().nome,
                       url:doc.data().url,
                       bg:doc.data().bg,
                       color:doc.data().color,
                    }
                )
            })

            setLinks(lista);
        })

    },[])

   

    async function handleRegister(e){
        e.preventDefault();

        if(nameInput === "" || urlInput === ""){
            toast.warn("Preencha todos os campos!")
            return;
        }

        addDoc(collection(db,"links"), {
            nome:nameInput,
            url:urlInput,
            bg:backgroundColorInput,
            color:textColorInput,
            created: new Date(),
        })
        .then(()=>{
            setNameInput("")
            setUrlInput("")
            toast.success("Link criado com sucesso")
            console.log('Link criado com sucesso')
        })
        .catch((error)=>{
            console.log('ERRO AO REGISTRAR LINK ' + error)
            toast.error("Ops erro ao salvar link")
        })// criando id aleatorio, definindo a colecao com o bd e o nome dela
    }

    async function handleDeleleteLink(id){
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }


    return(
        <div className="container-admin">
            <Header/>

            <Logo className="logo-admin"/>

            <form className="form-admin" onSubmit={handleRegister}>

                <label className='label'>Nome do link</label>
                <Input
                    value={nameInput}
                    onChange={(e)=> setNameInput(e.target.value)}
                    placeholder="Nome do seu link..."
                />

                <label className='label'>URL</label>
                <Input
                    value={urlInput}
                    onChange={(e)=> setUrlInput(e.target.value)}
                    type="url"
                    placeholder="Digite o url..."
                />

                <section className="container-colors">
                    <div>
                        <label className="label right">Fundo do link</label>
                        <input
                            value={backgroundColorInput}
                            onChange={(e)=> setBackgroundColorInput(e.target.value)}
                            type="color"
                        />
                    </div>

                    <div>
                        <label className="label right">Cor do link</label>
                        <input
                            value={textColorInput}
                            onChange={(e)=> setTextColorInput(e.target.value)}
                            type="color"
                        />
                    </div>
                </section>

                {nameInput !== '' &&(
                    <div className='preview'>
                        <label className='label'>Veja como está ficando</label>
                        <article className='list-admin' style={{ marginBottom: 8, marginTop: 8, backgroundColor:backgroundColorInput, color: textColorInput }}>
                            <p style={{ color:textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button 
                    className='btn'
                    type='submit'> Cadastrar 
                    <MdAddLink size={24} color="white"/>
                </button>

                <h2 className='title'>
                    Meus links
                </h2>

                { links.map((item, index) => (
                    <article 
                        key={index}
                        className='list-admin animate-pop' 
                        style={{ 
                            backgroundColor: item.bg, color: item.color
                        }}>
                            <p>{item.nome}</p>
                            <div>
                                <button className='btn-delete' onClick={() => handleDeleleteLink(item.id)}>
                                        <FiTrash2 size={18} color="white"></FiTrash2>
                                </button>
                            </div>
                    </article>
                ))}

            </form>
        </div>
        
        
    )
}