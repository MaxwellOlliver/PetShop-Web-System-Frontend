import React, { useState } from 'react';
import api from '../../services/api';

import './style.css'
import Logo from '../../assets/logo-horizontal.svg';
import Voltar from '../../assets/back_icon.svg';

export default function Login({ history }){
		let [cpf, setCpf] = useState("");

		async function handleSubmit(event){
				event.preventDefault(); 
				// 596.963.263-22

				const response = await api.post("/login", { cpf });

				if(!response.data.erro){
						localStorage.setItem("user", response.data._id);
						history.push("/");
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
										<button id="homeLogin" onClick={goToHome}>página inicial</button>
										<button className="btn-gray" disabled>fazer login</button>
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
										<div id="sub-btn">
											<button type="submit" id="login">
													Entrar
											</button>
											<button id="voltar" onClick={goToHome}>
												<img src={Voltar} alt="Voltar"/>
												voltar
											</button>
											
										</div>
										<hr/>
										<span>Não tem uma conta? <span id="toNew" onClick={goToNew}>Crie aqui</span></span>
								</form>
								<span><strong>Atenção!</strong> Para fazer agendamentos e consultas<br/> É necessário ter um cadastro em nosso sistema.</span>
								<span>Em casos de perca do número de acesso, favor <br/>nos mande um email ou nos ligue.</span>
						</div>
				</div>
		)
}