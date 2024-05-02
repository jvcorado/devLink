import './home.css'

import { Social } from '../../components/Social'
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
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
        <div className='container-home'>
            <Logo />
            <h1 className='name-text'>Jota o Programador</h1>
            <h4>Criando o amanhã, hoje!</h4>

            <main className='links'>

                {links.map((item) => (
                    <section
                        key={item.id}
                        className="link-area"
                        style={{
                            backgroundColor: item.bg, color: item.color
                        }}>
                        <a href={item.url}>
                            <p style={{ color: item.color }}>{item.nome}</p>
                        </a>

                    </section>
                ))}

                <button onClick={telaMensagem} className="btn">Enviar mensagem</button>

                {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                    <footer>
                        <Social url={socialLinks?.linkedin}>
                            <FaLinkedin size={35} color="#FFF" />
                        </Social>

                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#FFF" />
                        </Social>

                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={35} color="#FFF" />
                        </Social>
                    </footer>

                )}

            </main>
        </div>
    )
}