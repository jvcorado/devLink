import './home.css'

import { Social } from '../../components/Social'
import { FaLinkedin, FaInstagram, FaYoutube, } from 'react-icons/fa'
import { MdOutlinePostAdd } from 'react-icons/md'


import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';

import { useState, useEffect } from 'react';

import { db } from '../../services/firebaseConection';
import {
    getDocs,
    collection,
    query,
    orderBy,
    doc,
    getDoc

} from 'firebase/firestore';

export const Home = () => {

    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState({});


    const DynamicTag = ({ nome, props }) => {
        const tagName = `Fa${nome}`;
        const TagComponent = require('react-icons/fa')[tagName];

        if (!TagComponent) {
            return null; // Retorna null se o componente não for encontrado
        }

        return <TagComponent size={24} />;
    };


    const navigate = useNavigate();

    function telaMensagem() {
        navigate("/mensagem", { replace: true })
    }

    useEffect(() => {

        function loadLinks() {
            const linksRef = collection(db, 'links')
            const queryRef = query(linksRef, orderBy('created', 'asc'))

            getDocs(queryRef)
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push(
                            {
                                id: doc.id,
                                nome: doc.data().nome,
                                url: doc.data().url,
                                bg: doc.data().bg,
                                color: doc.data().color
                            }
                        )
                    })

                    setLinks(lista)
                })

        }

        loadLinks();

    }, [])

    useEffect(() => {

        function loadRedes() {
            const docRef = doc(db, 'redes', 'link')
            getDoc(docRef)
                .then((snapshot) => {

                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            linkedin: snapshot.data().linkedin,
                            instagram: snapshot.data().instagram,
                            youtube: snapshot.data().youtube
                        })

                    }

                })
        }

        loadRedes();


    }, [])



    return (
        <div className='container mx-auto flex flex-col   md:h-screen gap-5 md:max-w-[450px] !px-5'>
            <div className='w-full  flex flex-col gap-5'>
                <div className='flex items-center p-3 rounded-xl  gap-5 bg-[#1D1D1D] w-full'>
                    <Logo />
                    <div>
                        <h1 className='mt-0 ms-1'>Jota o Programador </h1>
                        <h4 className='mt-0 text-white text-xs'>☕️ | Criando o amanhã, hoje!</h4>

                    </div>
                </div>

                <div className='w-full grid grid-cols-2 gap-5'>
                    <main className='grid grid-cols-2 gap-5  w-full'>

                        {links.map((item) => (

                            <section
                                key={item.id}
                                className="w-full flex items-center justify-center h-[80px] rounded-xl"
                                style={{
                                    backgroundColor: item.bg, color: item.color
                                }}>
                                <a href={item.url}>
                                    <p style={{ color: item.color }} className='text-[14px]'>  <DynamicTag nome={item.nome} /></p>
                                </a>

                            </section>
                        ))}

                    </main>

                    <a href='https://blogjvc.netlify.app/' className=" bg-white w-full flex items-center justify-center  rounded-xl font-bold text-base text-black text-center  flex-col"><MdOutlinePostAdd size={60} />  Posts Recentes</a>
                </div>



                <button onClick={telaMensagem} className=" bg-cyan-600 w-full flex items-center justify-center h-[80px] rounded-xl font-bold text-lg text-white">Enviar mensagem</button>
                <a href='https://contrate.sitesexperience.com/jvcorado' className=" bg-green-500 w-full flex items-center justify-center h-[80px] rounded-xl font-bold text-lg text-white">Meu portfólio</a>
            </div>



            {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                <footer className='w-full grid grid-cols-3 rounded-xl p-3 gap-5 bg-[#1D1D1D] '>
                    <Social url={socialLinks?.linkedin}>
                        <FaLinkedin size={40} color="#FFF" />
                    </Social>

                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={40} color="#FFF" />
                    </Social>

                    <Social url={socialLinks?.youtube}>
                        <FaYoutube size={40} color="#FFF" />
                    </Social>
                </footer>

            )}
        </div>
    )
}

//teste