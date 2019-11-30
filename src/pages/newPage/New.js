import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../loginPage/style.css';
import nodemailer from "nodemailer";


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
			// eslint-disable-next-line no-unused-vars
			let testAccount = nodemailer.createTestAccount();
                            
			let transporter = nodemailer.createTransport({
					host: 'smtp.gmail.com',
					port: 587,
					secure: false, 
					auth: {
							user: 'petscaocompany@gmail.com', 
							pass: 'petscao2019'
					}
			});

			
			// eslint-disable-next-line no-unused-vars
			let info = transporter.sendMail({
					from: "'PetsCão' <petscaocompany@gmail.com>", 
					to: email, 
					subject: 'Bem vindo ao PetsCão',
					html: '<div style="display: flex; flex-direction: column; justify-content: center; width: 600px; align-items: center"><div style="display:flex;flex-direction: column; align-items: center;width: 550px;padding: 15px;  background-color: #3c8ad5; color: white;"><div style="background-color: #e69240; width: 500px; padding: 15px 10px; margin-top: 30px; border-radius: 10px;"><h1>Bem vindo ' + nome + '!</h1><br><span style="font-size: 16px;">Agora você faz parte dessa família amantes de animais! S2<br><br>Visite o nosso site para fazer um agendamento, adicionar novos pets ou saber mais sobre nós.<br>http://www.petscao.com.br<br>Agradecemos pela preferência S2<br><br><hr style="background-color: #3c8ad5; width: 100%; border: 0; height: 2px; margin: 40px 0 20px;"><p style="text-align:center">Atenciosamente,<br>Equipe PetsCão.</p></span></div></div></div>'
			});

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

	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(_id){
			history.push("/menu");
		}
	}, [history]);
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