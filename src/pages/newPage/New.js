import React, { useState } from 'react';
import api from '../../services/api'
import '../loginPage/style.css'

import Logo from '../../assets/logo-horizontal.svg';
import userLogo from '../../assets/user-logo.svg'

export default function New({ history }){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    async function handleSubmit(event){ 
        event.preventDefault();
        const response = await api.post('/user', { nome, email, cpf, telefone });
        
        if(!response.data.erro){
            localStorage.setItem("user", response.data._id);
            history.push("/new-animal");
        }else{
            if(nome === "" || cpf === "" || email === "" || telefone === ""){
                response.data.erro = "Por favor, preencha todos os campos abaixo."
            }
            let errMsg = document.querySelector("div#erro");
            errMsg.className = "err-msg"
            errMsg.innerText = response.data.erro
        }
    }

    function goToHome(){
        history.push("/");
    }
    return (
        <div className="container">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">
                    <button id="homeLogin" onClick={goToHome}>home</button>
                    <button id="entrarLogin" disabled>Criar conta</button>
                </div>
            </nav>
            <div id="newBg"></div>
            <div className="content-new">
                <div id="erro"></div>
                <form onSubmit={handleSubmit}>
                    <div id="titulo">
                        <img src={userLogo} alt="Usuário"/>
                        <h2>Cadastro de Usuário</h2>
                    </div>
                    <input 
                        type="text"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Seu Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Seu CPF"
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Seu Telefone"
                        value={telefone}
                        onChange={event => setTelefone(event.target.value)}
                    />

                    <button type="submit">próximo >></button>
                </form>
                <span><strong>Atenção!</strong> É necessário preencher todos os campos para efetuar <br/> o cadastro.</span>
            </div>
        </div>
    )
}