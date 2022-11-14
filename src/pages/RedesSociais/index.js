import './redesSociais.css'
import { MdAddLink } from 'react-icons/md';
import { Header } from '../../components/Header'
import { Input } from '../../components/Input';

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
    setDoc,
    getDoc,
    deleteDoc
} from 'firebase/firestore';
import { async } from '@firebase/util';


export const RedesSociais = ()=>{

    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    function handleSave(e){

        e.preventDefault();

        if(linkedin === '' || instagram === '' || youtube === ''){
            toast.warn("Preencha todos os campos!")
            return
        }

        setDoc(doc(db, 'redes', 'link'),{
            linkedin:linkedin,
            instagram:instagram,
            youtube:youtube
        })
        .then(()=>{
            toast.success('Links salvo com sucesso')
        })
        .catch((error)=>{
            toast.error('Erro ao salvar link ' + error)
        })
    }


    useEffect(()=>{


        function loadLinks(){
            const docRef = doc(db, 'redes', 'link')
            getDoc(docRef)
            .then((snapshot)=>{

                if(snapshot.data() !== undefined){
                    setLinkedin(snapshot.data().linkedin)
                    setInstagram(snapshot.data().instagram)
                    setYoutube(snapshot.data().youtube)
                }
              
            })
        }

        loadLinks();


    },[])

    return(
        <div className='container-admin'>
            <Header/>

            <h1 className='title-social'>Suas redes sociais</h1>
            <form className='form-admin' onSubmit={handleSave}>
                <label className='label'>Link do Linkedin</label>
                <Input
                    type="url"
                    value={linkedin}
                    placeholder="Digite a url do Linkedin..."
                    onChange={(e)=>setLinkedin(e.target.value)}
                />

                <label className='label'>Link do Instagram</label>
                <Input
                    type="url"
                    value={instagram}
                    placeholder="Digite a url do instagram..."
                    onChange={(e)=>setInstagram(e.target.value)}
                />

                <label className='label'>Link do Youtube</label>
                <Input
                    type="url"
                    value={youtube}
                    placeholder="Digite a url do youtube..."
                    onChange={(e)=>setYoutube(e.target.value)}
                />

                <button 
                    className='btn-register'
                    type='submit'> Salvar links
                    <MdAddLink size={24} color="white"/>
                </button>

            </form>
        </div>
    )
}