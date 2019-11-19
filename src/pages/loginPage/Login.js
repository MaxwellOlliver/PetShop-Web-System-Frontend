import React, { useState } from 'react';
import api from '../../services/api';

import './style.css'
import Logo from '../../assets/logo-horizontal.svg';

export default function Login({ history }){
    let [cpf, setCpf] = useState("");

    async function handleSubmit(event){
        event.preventDefault();
        // 596.963.263-22

        const response = await api.post("/login", { cpf });
        console.log(response)
        if(!response.data.erro){
            localStorage.setItem("user", response.data._id);
            history.push("/menu");
        }else{
            if(cpf === ""){
                response.data.erro = "Por favor, preencha o campo abaixo."
            }
            let errMsg = document.querySelector("div#erro");
            errMsg.className = "err-msg"
            errMsg.innerText = response.data.erro
        }
    }

    function goToHome(){
        history.push("/");
    }
    function goToNew(){
        history.push("/new-user");
    }

    return (
        <div className="container">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">
                    <button id="homeLogin" onClick={goToHome}>home</button>
                    <button id="entrarLogin" disabled>fazer login</button>
                </div>
            </nav>
            <div id="loginBg"></div>
            <div className="content-login">
                <div id="erro"></div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="cpf" 
                        id="cpf"
                        placeholder="Seu CPF"                          
                        value={cpf} 
                        onChange={event => setCpf(event.target.value)}/>
                    <button type="submit" >
                        Entrar
                    </button>
                    <hr/>
                    <span>Não tem uma conta? <span id="toNew" onClick={goToNew}>Crie aqui</span></span>
                </form>
                <span><strong>Atenção!</strong> Para fazer agendamentos e consultas<br/> É necessário ter um cadastro em nosso sistema.</span>
            </div>
        </div>
    )
}