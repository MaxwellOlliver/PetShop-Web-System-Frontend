import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Logo from '../../assets/logo-horizontal.svg';
import ScheduleList from '../../assets/schedule-logo-header.svg';
import eraser from '../../assets/eraser_icon.svg';
import back from '../../assets/back_icon.svg';
import newSch from '../../assets/schedule-icon.svg';

export default function Agendamento({history}){
	const [ agendamento, setAgendamento ] = useState([]);
	let modalDestroy = document.querySelector("div#modal-container-destroy");
	var agendamento_id = [];
	let tamanho = agendamento.length
  let check = document.querySelector("#selectAll");
	
	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}, [history]);

  useEffect(()=>{
    const user_id = localStorage.getItem('user')
    async function loadAgendamentos(){
      const response = await api.get("/schedule-list", { headers:{user_id} });
			console.log(response)
      if(!response.data.message){
        setAgendamento(response.data)
      }else if(response.data.message){
        let err = document.querySelector("div#noAgendamento")
        err.className = "noAnimal-modal"
        err.innerText = `${response.data.message}`
			}
  
    }
    loadAgendamentos()
  },[]);

	function selectAll(){
		if(agendamento[0]){
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
		}
  }

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

	function goToHome(){
		history.push("/");
	} 
	function goToNew(){
		history.push("/new-schedule");
	}

	function logout(){
		localStorage.removeItem("user");
		history.push("/");
	}
	
	function goToAnimal(){
		history.push("/animal-list");
	}
	function goToPerfil(){
		history.push("/me")
	} 
	return (
		<>
			<div className="container">
				<nav>
					<img src={Logo} alt="PetsCão" id="homeLogo"/>
					<div id="menu">
						<button id="entrar" onClick={goToAnimal}>meus pets</button>
						<button id="entrar" onClick={goToPerfil}>meu perfil</button>
						<button id="homeLogin" onClick={goToHome}>página inicial</button>
						<button id="logout" onClick={logout}>sair</button>
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
					<button id="voltar" onClick={goToHome}>
						<img src={back} alt="Voltar"/>
						voltar
					</button>
					<span>• Caso queira mudar o dia ou hora, por favor, <br/>
						nos mande um email ou ligue no número (92) 2597-1288.
					</span>
				</div>
			</div>
			<div id="modal-container-destroy" className="modal-container">
				<div className="modal">
					<h3>Tem certeza que deseja deletar os agendamentos selecionados?</h3>
					<div id="sub-btn">
						<button id="nao" onClick={closeModalDestroy}>não</button>
						<button id="sim" onClick={destroySchedule}>sim</button>
					</div>
				</div>
			</div>
		</>
	)
}