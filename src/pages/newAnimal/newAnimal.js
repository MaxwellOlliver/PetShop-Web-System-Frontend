import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import '../loginPage/style.css'

import Logo from '../../assets/logo-horizontal.svg';
import animalLogo from '../../assets/animal-logo.svg'

export default function Animal({ history }){
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [raca, setRaca] = useState("");
    const user_id = localStorage.getItem("user");

	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}, [history]);
    
    async function handleSubmit(event){
        event.preventDefault();
        let errMsg = document.querySelector("div#erro");

        if(nome !== "" && tipo !== "" && raca !== ""){

            const response = await api.post("/user/animal", { nome, tipo, raca}, {headers: {user_id}});

            if(response.data._id || !response.data.erro){
                
                errMsg.className = "access-msg"
                errMsg.innerText = "Pet cadastrado com sucesso!"
    
                setNome("");
                setTipo("");
                setRaca("");
            }else{
                errMsg.className = "err-msg"
                errMsg.innerText = response.data.erro
            }
        }else{
            errMsg.className = "err-msg"
            errMsg.innerText = "Por favor, preencha todos os campos."
        }
    }

    function goToHome(){
        history.push("/");
    }

    function goToPets(){
        history.push("/animal-list")
    }
    function logout(){
		localStorage.removeItem("user");
		history.push("/");
	}
    return (
        <div className="container">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">
                    <button id="homeLogin" onClick={goToHome}>página inicial</button>
                    <button id="logout" onClick={logout}>sair</button>
                </div>
            </nav>
            <div id="newBg"></div>
            <div className="content-new">
                <div id="erro"></div>
                <form onSubmit={handleSubmit}>
                    <div id="titulo">
                        <img src={animalLogo} alt="Usuário"/>
                        <h2>Cadastro de Animal</h2>
                    </div>
                    <input 
                        id="nome"
                        type="text"
                        placeholder="Nome do Pet"
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Tipo de Pet"
                        value={tipo}
                        onChange={event => setTipo(event.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Raça do Pet"
                        value={raca}
                        onChange={event => setRaca(event.target.value)}
                    />
                    <div id="sub-btn">
                        <button id="fim" onClick={goToPets}>ir para meus pets</button>
                        <button type="submit" id="novo">adicionar pet</button>
                    </div>
                </form>
                <span><strong>Atenção!</strong> Após cadastrar seu Pet finalize clicando fim. <br/>
                Se for cadastrar outro Pet clique em novo pet.</span>
            </div>
        </div>
    )
}