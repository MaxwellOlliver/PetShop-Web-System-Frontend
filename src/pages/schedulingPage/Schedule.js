import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Logo from '../../assets/logo-horizontal.svg';
import scheduleLogo from '../../assets/agenda-new.svg'

export default function Schedule({history}){

	const [ animalList, setAnimalList ] = useState([]);
	const [ animal, setAnimal ] = useState("");
	const [ data, setDate ] = useState("");
	const [ hora, setHour ] = useState("");
	const [ servico, setService ] = useState();
	const [ horaValidation, setHoraValidation] = useState([]);
	const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

	function isLogged(){
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}

	useEffect(()=>{
		async function getHour(){
			const hour = await api.get("/get-hours", {headers:{data}});
			
			if(hour.data){
				setHoraValidation(hour.data)
			}
		}
		getHour()
	}, [data])

	useEffect(()=>{
		async function loadAnimals(){
			const user_id = localStorage.getItem("user");
			const response = await api.get("/animal-list", {headers: {user_id}});

			setAnimalList(response.data)
		}
		loadAnimals()
	}, [])

	async function handleSubmit(event){
		event.preventDefault()
		let errMsg = document.querySelector("div#erro");
		const user_id = localStorage.getItem("user");

		if(animal !== "" && data !== "" && hora !== "" && servico !== ""){
			const response = await api.post('/new-schedule', { animal, data, hora, servico }, {headers: {user_id}});
					
			if(!response.data.erro){
					history.push("/schedule-list");
			}else{	
					errMsg.className = "err-msg"
					errMsg.innerText = response.data.erro
			}
		}else{
			errMsg.className = "err-msg"
			errMsg.innerText = "Por favor, preencha todos os campos abaixo."
		}
	}
	
	function goToHome(){
		history.push("/");
	}
	return (
		<div className="container" onLoad={isLogged}>
			<nav>
        <img src={Logo} alt="PetsCão" id="homeLogo"/>
        <div id="menu">
          <button id="homeLogin" onClick={goToHome}>home</button>
          <button id="entrarLogin" disabled>menu</button>
        </div>
      </nav>
			<div id="newBg"></div>
			<div className="content-new">
				<div id="erro"></div>
					<form onSubmit={handleSubmit}>
						<div id="titulo">
              <img src={scheduleLogo} alt="Usuário"/>
              <h2>Agendamento</h2>
            </div>
						<select 
							name="animals" 
							id="animals"
							defaultValue={"DEFAULT"}
							onChange={event => setAnimal(event.target.value)}
						>
							<option value="DEFAULT" disabled>Selecione o animal</option>
							{animalList.map(animal => {
								return <option key={animal._id} value={animal._id}>{animal.nome}</option>
							})}
						</select>
						<div id="datetimeButtons">
							<input 
								type="date" 
								name="Data" 
								id="data"
								onChange={event => setDate(event.target.value)}
							/>

							<select 
								name="hour" 
								id="hour"
								defaultValue={"DEFAULT"}
								onChange={event => setHour(event.target.value)}
							>
								<option value="DEFAULT" disabled>hh : mm</option>
								{horaValidation[0]?horarios.map(hora => { return horaValidation.map((value, index) => { 
									return hora !== value.hora ? <option key={index} value={hora}>{hora}</option>:""
								}) }):horarios.map((hora, index)=>{return <option key={index} value={hora}>{hora}</option>})}
							</select>
						</div>
						<select 
							name="servico" 
							id="servico" 
							defaultValue={"DEFAULT"}
							onChange={event => setService(event.target.value)}
						>
							<option value="DEFAULT" disabled>Selecione o serviço</option>
							<option value="vacina">Vacina</option>
							<option value="banho">Banho</option>
							<option value="tosa">Tosa</option>
						</select>
						<button 
							type="submit" 
							id="agendar"
						>
							agendar
						</button>
					</form>
					<span><strong>Atenção! Escolha qual Pet irá agendar, escolha a data <br/> e hora e depois o tipo de serviço, e clique em <span>agendar</span>.</strong></span>
				</div>
		</div>
	)
}