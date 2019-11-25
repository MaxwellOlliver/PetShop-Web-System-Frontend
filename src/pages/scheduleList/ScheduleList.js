import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Logo from '../../assets/logo-horizontal.svg';
import ScheduleList from '../../assets/schedule-logo-header.svg';
import eraser from '../../assets/eraser_icon.svg';
import edit from '../../assets/edit_icon.svg';
import back from '../../assets/back_icon.svg';
import newSch from '../../assets/schedule-icon.svg';

export default function Agendamento({history}){
  const [ animal, setAnimal ] = useState([]);
	const [ agendamento, setAgendamento ] = useState([]);
	const [ animalEdit, setAnimalEdit ] = useState("");
	const [ animalValue, setAnimalValue ] = useState("");
	const [ servicoEdit, setServicoEdit ] = useState("");
	const [ dataEdit, setDataEdit ] = useState("");
	const [ horaEdit, setHoraEdit ] = useState("");
	const [ agendaID, setAgendaID ] = useState("");
	let modal = document.querySelector("div#modal-container");
	let modalDestroy = document.querySelector("div#modal-container-destroy");
	var agendamento_id = [];
	let tamanho = agendamento.length
  let check = document.querySelector("#selectAll");
  const [ horaValidation, setHoraValidation] = useState([]);
  const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  useEffect(()=>{
    const user_id = localStorage.getItem('user')
    async function loadAgendamentos(){
      const response = await api.get("/schedule-list", { headers:{user_id} });
      const animals = await api.get("/animal-list", { headers: {user_id} });
  
      if(!response.data.message){
        setAgendamento(response.data)
        setAnimal(animals.data)
      }else{
        let err = document.querySelector("div#noAgendamento")
        err.className = "noAgendamento-modal"
        err.innerText = `${response.data.message}`
      }
  
    }
    loadAgendamentos()
  },[]);

	function selectAll(){

		if(check.checked === true){
			for(let c = 0; c < agendamento.length; c++){
        if(!agendamento_id.includes(agendamento[c]._id)){
					agendamento_id.push(agendamento[c]._id)
				}
				document.querySelector(`#checkAgenda-${c}`).checked = true;
			}
		}else{
			for(let c = 0; c < agendamento.length; c++){
        document.querySelector(`#checkAgenda-${c}`).checked = false;
			}
			agendamento_id = [];
		}

		console.log(agendamento_id)
  }
  useEffect(()=>{
		async function getHour(){
			const hour = await api.get("/get-hours", {headers:{dataEdit}});
			
			if(hour.data){
				setHoraValidation(hour.data)
			}
		}
		getHour()
	}, [dataEdit])

	function getAgenda(id){
		let alreadyHave = agendamento_id.includes(id);
		let aviso = document.querySelector("div#errSelect");

		if(!alreadyHave){
			agendamento_id.push(id);
		}else{
			
			for(let c = 0; c <= agendamento_id.length; c++){
				if(agendamento_id[c] === id){
					agendamento_id.splice(c, 1);
				}
			}
		}
		document.querySelector("input#selectAll").checked = false;
		if(agendamento_id.length === tamanho && check.checked === false){
			check.checked = true
		}
		

		if(agendamento_id.length > 0){
			aviso.classList.remove("hidden")
			aviso.classList.add("hidden")
			aviso.innerText = ""
		}
		console.log(agendamento_id)
	}

	function openModalDestroy(){
		let aviso = document.querySelector("div#errSelect");
		if(agendamento_id.length > 0){
			modalDestroy.classList.add("mostrar")
		}else{
			aviso.className = "errNoSelect"
			aviso.innerText = "Por favor, selecione um agendamento."
		}
	}
	

	async function updateScheduleModal(){
    let aviso = document.querySelector("div#errSelect");
    let user_id = localStorage.user;
		if(agendamento_id.length === 1){
			const [ agenda_id ] = agendamento_id

      const response = await api.get("/schedule-list", {headers: {user_id, agenda_id}});

			if(!response.data.erro){
        let date = response.data.data.split("/");
				setAnimalEdit(response.data.animal);
				setServicoEdit(response.data.servico);
				setDataEdit(`${date[2]}-${date[1]}-${date[0]}`);
				setHoraEdit(response.data.hora);
        setAgendaID(agenda_id);
			}else{
				//
			}
			modal.classList.add("mostrar");

		}else{
			aviso.className = "errNoSelect"
			if(agendamento_id.length > 1){
				aviso.innerText = "Selecione um de cada vez."
			}else{
				aviso.innerText = 'Por favor, selecione um agendamento.'
			}
			
		} 
	}

	async function updateSchedule(){
		const user_id = localStorage.user;
    let aviso = document.querySelector("div#errSelect");
    
    console.log(dataEdit)
    console.log(animalEdit)

		const response = await api.put(`/edit-schedule/${agendaID}`,{ animalValue, servicoEdit, dataEdit, horaEdit }, { headers: { user_id } })

		if(!response.data.erro){
			const newScheduleList = await api.get("/schedule-list", {headers: {user_id}});
			aviso.classList.remove("hidden");
			aviso.classList += "accessNoSelect"
			aviso.innerText = "Edição realizada com sucesso."
			setAgendamento(newScheduleList.data)
			setTimeout(()=>{
				aviso.classList += " hidden"
			}, 3000)


		}else{
			aviso.className = "errNoSelect"
			aviso.innerText = `${response.data.erro}`
		}

		closeModal()
	}

	function closeModal(){
		modal.classList.remove("mostrar");
		
		document.querySelector("input#selectAll").checked = false;
		for(let c = 0; c < agendamento.length; c++){
			document.querySelector(`#checkAgenda-${c}`).checked = false;
			agendamento_id.splice(0,1)
		}
	}

	function closeModalDestroy(){
		modalDestroy.classList.remove("mostrar");

		document.querySelector("input#selectAll").checked = false;
		for(let c = 0; c < agendamento.length; c++){
			document.querySelector(`#checkAgenda-${c}`).checked = false;
		}
		agendamento_id = []

	}

	async function destroySchedule(){
		let indexValue = []
		let agenda_id = JSON.stringify(agendamento_id)
		let aviso = document.querySelector("div#errSelect");

		if(agendamento_id.length > 0){
			agendamento.map((agenda, index) => {
				return agendamento_id.map(value => value === agenda._id ?	indexValue.push(index) : null);
			});
			indexValue.map(value => document.querySelector(`tr#agendamento-${value}`).className = "hidden"
			)
			const response = await api.delete("/destroy-schedule", {headers: { agenda_id }})
      closeModalDestroy()
      
			if(response.data.erro){
				aviso.className = "errNoSelect"
				aviso.innerText = `${response.data.erro}`
			}
      
		}
	}

	async function handleSubmit(e){
		e.preventDefault()
	}

	function goToMenu(){
		history.push("/menu");
	}

	function goToHome(){
		history.push("/");
	} 
	function goToNew(){
		history.push("/new-schedule");
	}
	return (
		<>
			<div className="container">
				<nav>
					<img src={Logo} alt="PetsCão" id="homeLogo"/>
					<div id="menu">
						<button id="homeLogin" onClick={goToHome}>home</button>
						<button id="entrarLogin" disabled>agendamentos</button>
					</div>
				</nav>
				<div id="headerAnimal">
					<img src={ScheduleList} alt="Logo agendamento"/>
					<h2>Agendamentos</h2>
				</div>

				<div id="noAgendamento"></div>
				<table>
					<thead>
						<tr>
							<th className="just-right">
								<input 
									type="checkbox" 
									className="checkbox reverse-checkbox" 
									name="selectAll"
									id="selectAll"
									onClick={selectAll}
								/>
								<label htmlFor="selectAll"></label></th>
							<th>Animal</th>
							<th>Tipo de serviço</th>
							<th>Data</th>
							<th>Hora</th>
						</tr>
					</thead>
					<tbody>
						{agendamento.map((agendamento, index) => {
							return (
							<tr id={`agendamento-${index}`} key={agendamento._id}>
								<td className="just-right">
									<input 
										type="checkbox" 
										className="checkbox" 
										name={`checkAgenda-${index}`} 
										id={`checkAgenda-${index}`} 
										onClick={() => getAgenda(agendamento._id)}/>
									<label htmlFor={`checkAgenda-${index}`}></label>
								</td>
								<td>{agendamento.animal.nome}</td>
								<td>{agendamento.servico}</td>
								<td>{agendamento.data}</td>
								<td>{agendamento.hora}</td>
							</tr>
							)
						})}
					</tbody>
				</table>
				<div id="footerAnimal">
					<div id="errSelect"></div>
					<button id="novoPet" onClick={goToNew}>
						<img src={newSch} alt="Novo agendamento"/>
						novo agendamento
					</button>
					<button id="apagar" onClick={openModalDestroy}>
						<img src={eraser} alt="Apagar"/>
						apagar
					</button>
					<button id="editar"  onClick={updateScheduleModal}>
						<img src={edit} alt="Editar"/>
						editar
					</button>
					<button id="voltar" onClick={goToMenu}>
						<img src={back} alt="Voltar"/>
						voltar
					</button>
				</div>
			</div>
			<div id="modal-container" className="modal-container">
				<div id="modal" className="modal">
					<form onSubmit={handleSubmit}>
          <select 
							name="animal" 
							id="animal"
							onChange={event => setAnimalValue(event.target.value)}
						>
							{animal.map(animal => {
								return <option key={animal._id} value={animal._id}>{animal.nome}</option>
							})}
						</select>
						<input 
								type="text"
								placeholder="Tipo de Serviço"
								value={servicoEdit}
								onChange={(event => setServicoEdit(event.target.value))}
						/>
						<input 
                type="date"
                placeholder={dataEdit}
								value={dataEdit}
								onChange={(event => setDataEdit(event.target.value))}
						/>
						<select 
              name="hour" 
              id="hour"
              defaultValue={"DEFAULT"}
              onChange={event => setHoraEdit(event.target.value)}
						>
              <option value="DEFAULT" disabled>{horaEdit}</option>
              {horaValidation[0]?horarios.map(hora => { return horaValidation.map((value, index) => { 
                return hora !== value.hora ? <option key={index} value={hora}>{hora}</option>:"teste"
              }) }):horarios.map((hora, index)=>{return <option key={index} value={hora}>{hora}</option>})}
						</select>
						<div id="sub-btn">
								<button id="fim" onClick={closeModal}>voltar</button>
								<button type="submit" id="novo" onClick={updateSchedule}>editar</button>
						</div>
					</form>
				</div>
			</div>
			<div id="modal-container-destroy" className="modal-container">
				<div className="modal">
					<h3>Tem certeza que deseja deletar os animais selecionados?</h3>
					<div id="sub-btn">
						<button id="nao" onClick={closeModalDestroy}>não</button>
						<button id="sim" onClick={destroySchedule}>sim</button>
					</div>
				</div>
			</div>
		</>
	)
}