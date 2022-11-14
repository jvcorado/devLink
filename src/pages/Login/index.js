import './login.css';
import { Logo } from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../services/firebaseConection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Input } from '../../components/Input';


export const Login = ()=>{

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();

        if(email === '' || password === ''){
            alert("Preencha todos os campos!")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            toast.success("Bem vindo")
            navigate("/admin", { replace:true })
        }).catch(()=>{
           toast.error("Erro ao tentar fazer login")
        })
        
    }


    return(
        <main className='container-login'>
            <Logo/>
            <form className='form' onSubmit={handleLogin}>
                <Input
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Digite seu email'
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)} //pegando o valor do input atraves do evento
                />
                 <Input
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='*********' 
                    autoComplete='on'
                    value={password}
                    onChange={ (e)=> setPassword(e.target.value)}
                />
    
                <button type='submit' className='btn'>Acessar</button>
               
            </form>
        </main>

    )
}