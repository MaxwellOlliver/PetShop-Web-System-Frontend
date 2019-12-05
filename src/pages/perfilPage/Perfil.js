/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import '../loginPage/style.css'
import Logo from '../../assets/logo-horizontal.svg';
import Voltar from '../../assets/back_icon.svg';
import edit from '../../assets/edit_icon.svg';

export default function Login({ history }){
	let [schedule, setSchedule ] = useState([])
  let [nome, setNome] = useState("");
  let [cpf, setCpf] = useState("");
  let [email, setEmail] = useState("");
	let [telefone, setTelefone] = useState("");
	let [ animal, setAnimal ] = useState([]);
    
	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}, [history]);
    
	useEffect(()=>{
		const user_id = localStorage.getItem('user')
		async function loadAnimals(){
			const response_animal = await api.get("/animal-list", {headers:{user_id}});
			const response_schedule = await api.get("/schedule-list", { headers: {user_id} });
			const response_user = await api.get("/get-perfil", { headers: {user_id} });

			console.log(response_schedule)

			if(!response_user.data.erro ){
				setAnimal(response_animal.data);
				setSchedule(response_schedule.data);
				setNome(response_user.data.nome);
				setEmail(response_user.data.email);
				setCpf(response_user.data.cpf);
				setTelefone(response_user.data.telefone);
			}else{

			}

		}
		loadAnimals()
	}, [])

	async function handleSubmit(event){
			event.preventDefault(); 
			// 596.963.263-22
			const user_id = localStorage.getItem('user');

			const response = await api.put("/edit-user", { nome, email, cpf, telefone }, {headers: {user_id}});

			if(!response.data.erro){
				document.querySelector("div#erro").classList.add("access-msg");
				document.querySelector("div#erro").innerText = "Dados editados com sucesso!"
			}
	}

	function goToHome(){
			history.push("/");
	}

	function logout(){
		localStorage.removeItem("user");
		history.push("/")
		
	}
	function goToAnimal(){
		history.push("/animal-list");
	}
	function goToSchedule(){
		history.push("/schedule-list");
	}	

	return (
			<div className="container">
					<nav>
							<img src={Logo} alt="PetsCão" id="homeLogo"/>
							<div id="menu">
									<button id="entrar" onClick={goToAnimal}>meus pets</button>
                  <button id="entrar" onClick={goToSchedule}>meus agendamentos</button>
									<button id="homeLogin" onClick={goToHome}>página inicial</button>
									<button className="btn-gray" onClick={logout}>sair</button>
							</div>
					</nav>
					<div id="loginBg"></div>
					<div className="content-perfil">
						<div id="conteudo">
							<div id="erro"></div>
							<form onSubmit={handleSubmit}>
								<h2>Dados pessoais</h2>
									<input 
											type="text" 
											name="nome" 
											id="nome"
											placeholder="Seu nome"                        
											value={nome} 
											onChange={event => setNome(event.target.value)}/>
									<input 
											type="email" 
											name="email" 
											id="email"
											placeholder="Seu email"                        
											value={email} 
											onChange={event => setEmail(event.target.value)}/>
									<input 
											type="text" 
											name="cpf" 
											id="cpf"
											placeholder="Seu CPF"                        
											value={cpf} 
											onChange={event => setCpf(event.target.value)}/>
									<input 
											type="text" 
											name="telefone" 
											id="telefone"
											placeholder="Seu telefone"                        
											value={telefone} 
											onChange={event => setTelefone(event.target.value)}/>
									<div id="sub-btn">
										<button type="submit" id="login">
											<img src={edit} alt="Editar"/>	
											Editar
										</button>
										<button id="voltar" onClick={goToHome}>
											<img src={Voltar} alt="Voltar"/>
											voltar
										</button>
										
									</div>
							</form>
						</div>
							<div id="ScheduleAndAnimal">
								<div id="animalList">
									<h2>Meus Pets</h2>
									<ul>
										{animal.message ? <li>{animal.message}</li>:animal.map((animal, index)=>{
											return <li key={index}>{animal.nome}</li>
										})}
									</ul>
								</div>
								<div id="scheduleList">
									<h2>Meus Agendamentos</h2>
									<ul>
										{schedule.message ? <li>{schedule.message}</li>: schedule.map((schedule, index)=>{
											return <li key={index}>{schedule.animal.nome} - {new Date(schedule.data).toLocaleDateString("pt-BR", {timeZone: "UTC"})} às {schedule.hora} - {schedule.servico}</li>
										})}
									</ul>
								</div>

							</div>
					</div>
			</div>
		)
}