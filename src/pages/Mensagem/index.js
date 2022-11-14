import './mensagem.css'
import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { HeaderHome } from '../../components/HeaderHome';
import emailjs from '@emailjs/browser'

export const Mensagem = ()=>{

  const [nomeInput, setNomeInput] = useState('');
  const [msgInput, setMsgInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  function handleEnvio(e){
    e.preventDefault()
    
    if(nomeInput === "" || emailInput === "" || msgInput === ""){
      alert('Preencha os campos')
      return
    }
    const templateParams = {
      from_name: nomeInput,
      message: msgInput,
      email: emailInput
    }
    emailjs.send('service_z3f5lx3','template_6unam49',templateParams,'6gMuhq6cYpRE3Ry_F')
    .then((response)=>{
      console.log("Email Enviado",response.status.text)
      setNomeInput('')
      setEmailInput('')
      setMsgInput('')
    },(error)=>{
      console.log('Error ' + error)
    })
  }

  return(
  
    <div className='container'>
      <form className='form' onSubmit={handleEnvio}>
        <h1 className='text'>Enviar Mensagem</h1>
        <Input
          type="nome"
          placeholder="Digite seu Nome"
          name="nome"
          value={nomeInput}
          onChange={(e)=>setNomeInput(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Digite seu Email"
          name="email"
          value={emailInput}
          onChange={(e)=>setEmailInput(e.target.value)}
        />

        <textarea 
          name="mensagem" 
          id="mensagem" 
          cols="30" 
          rows="10"
          placeholder='Digite sua Mensagem'
          value={msgInput}
          onChange={(e)=>setMsgInput(e.target.value)}>
        </textarea>

        <button type='submit' className='btn'>Enviar</button>

      </form>
    </div>
  )
}