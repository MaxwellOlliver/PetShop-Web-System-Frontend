import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Logo from '../../assets/logo-horizontal.svg';
import scheduleLogo from '../../assets/agenda-new.svg';
import back from '../../assets/back_icon.svg';

export default function Schedule({history}){

	const [ animalList, setAnimalList ] = useState([]);
	const [ animal, setAnimal ] = useState("");
	const [ data, setDate ] = useState("");
	const [ hora, setHour ] = useState("");
	const [ servico, setService ] = useState();
	const [ horaValidation, setHoraValidation] = useState([]);
	const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
	const modal = document.querySelector("#modal-container");

	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}, [history]);

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

			if(!response.data.message){
				setAnimalList(response.data)
			}else{
				let err = document.querySelector("div#erro");
				let count = 10;
				err.classList.add("err-msg");
				err.classList.add("h-80");
				start()
				function start(){
					if(count === 0){
						history.push("/new-animal");
					}
					count -= 1
					err.innerHTML = `Por favor adicione um pet antes de fazer um agendamento.<br>Você será redirecionado para a aba de adição de pet em ${count}`
					setTimeout(start, 1000);
				}
			}

		}
		loadAnimals()
	}, [history])

	async function handleSubmit(event){
		event.preventDefault()
		let errMsg = document.querySelector("div#erro");
		const user_id = localStorage.getItem("user");
		const animal_id = animal;

		if(animal !== "" && data !== "" && hora !== "" && servico !== ""){
			const response = await api.post('/new-schedule', { animal, data, hora, servico }, {headers: {user_id}});
			
			if(!response.data.erro){
				const agenda_id = response.data._id
				const pendente = await api.post('/pending', { data, hora, servico }, {headers:{ user_id, animal_id, agenda_id }});

				if(!pendente.data.erro){
					openModal()
				}
			}else{	
					errMsg.className = "err-msg"
					errMsg.innerText = response.data.erro
			}
		}else{
			errMsg.className = "err-msg"
			errMsg.innerText = "Por favor, preencha todos os campos abaixo."
		}
	}

	function openModal(){
		if(animal !== [] && data !== "" && hora !== "" && servico !== []){
			modal.classList.add("mostrar");
		}else{
			document.querySelector("div#erro").classList.add("err-msg");
			document.querySelector("div#erro").innerText = "Por favor, preencha todos os campos.";

		}
	}
	
	function goToHome(){
		history.push("/");
	}
	function logout(){
		localStorage.removeItem("user");
		history.push("/");
	}
	return (
		<>
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
						<div id="sub-btn" style={{padding: '0'}}>
							<button 
								type="submit" 
								id="agendar"
								style={{marginRight: '20px'}}
							>
								agendar
							</button>
							<button id="voltar" onClick={goToHome}><img src={back} alt="Voltar"/>voltar</button>
						</div>
					</form>
					<span><strong>Atenção! Escolha qual Pet irá agendar, escolha a data <br/> e hora e depois o tipo de serviço, e clique em agendar.</strong></span>
				</div>
			</div>
				<div id="modal-container" className="modal-container">
					<div className="modal">
					<h3><span>Eba! Tudo ocorreu bem!</span><br/><p>Agora, aguarde até que a gente confirme seu agendamento. <br/> Não se preocupe, te enviaremos um e-mail assim que confirmarmos.</p></h3>
					<button onClick={goToHome}>OK!</button>
				</div>
			</div>
		</>
	)
}