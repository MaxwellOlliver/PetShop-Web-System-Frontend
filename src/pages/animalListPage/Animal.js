import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Logo from '../../assets/logo-horizontal.svg';
import AnimalList from '../../assets/animal-list.svg';
import eraser from '../../assets/eraser_icon.svg';
import edit from '../../assets/edit_icon.svg';
import back from '../../assets/back_icon.svg';
import newAni from '../../assets/new-pet.svg';

export default function Animal({history}){
	const [ animal, setAnimal ] = useState([]);
	const [ nomeEdit, setNomeEdit ] = useState("");
	const [ tipoEdit, setTipoEdit ] = useState("");
	const [ racaEdit, setRacaEdit ] = useState("");
	const [ animalID, setAnimalID ] = useState("");
	let modal = document.querySelector("div#modal-container");
	let modalDestroy = document.querySelector("div#modal-container-destroy");
	var animal_id = [];
	let tamanho = animal.length
	let check = document.querySelector("#selectAll");

	useEffect(()=>{
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}, [history]);

	function selectAll(){
		if(animal[0]){
			if(check.checked === true){
				for(let c = 0; c < animal.length; c++){
					if(!animal_id.includes(animal[c]._id)){
						animal_id.push(animal[c]._id)
					}
					document.querySelector(`#checkAnimal-${c}`).checked = true;
				}
			}else{
				for(let c = 0; c < animal.length; c++){
					document.querySelector(`#checkAnimal-${c}`).checked = false;
				}
				animal_id = [];
			}
		}
	}

	function getAnimal(id){
		let alreadyHave = animal_id.includes(id);
		let aviso = document.querySelector("div#errSelect");

		if(!alreadyHave){
			animal_id.push(id);
		}else{
			
			for(let c = 0; c <= animal_id.length; c++){
				if(animal_id[c] === id){
					animal_id.splice(c, 1);
				}
			}
		}
		document.querySelector("input#selectAll").checked = false;
		if(animal_id.length === tamanho && check.checked === false){
			check.checked = true
		}
		

		if(animal_id.length > 0){
			aviso.classList.remove("hidden")
			aviso.classList.add("hidden")
			aviso.innerText = ""
		}
		
	}

	function openModalDestroy(){
		let aviso = document.querySelector("div#errSelect");
		if(animal_id.length > 0){
			modalDestroy.classList.add("mostrar")
		}else{
			aviso.className = "errNoSelect"
			aviso.innerText = "Por favor, selecione um animal."
		}
	}
	
	useEffect(()=>{
		const user_id = localStorage.getItem('user')
		async function loadAnimals(){
			const response = await api.get("/animal-list", {headers:{user_id}})

			if(!response.data.message){
				setAnimal(response.data)
			}else{
				let err = document.querySelector("div#noAnimal")
				err.className = "noAnimal-modal"
				err.innerText = `${response.data.message}`
			}

		}
		loadAnimals()
	},[])

	async function updateAnimalModal(){
		let aviso = document.querySelector("div#errSelect");
		if(animal_id.length === 1){
			const [ ani_id ] = animal_id

			const response = await api.get("/animal-list", {headers: {ani_id}});

			if(!response.data.erro){
				setNomeEdit(response.data.nome);
				setTipoEdit(response.data.tipo);
				setRacaEdit(response.data.raca);
				setAnimalID(ani_id)
			}else{
				//
			}
			modal.classList.add("mostrar");

		}else{
			aviso.className = "errNoSelect"
			if(animal_id.length > 1){
				aviso.innerText = "Selecione um de cada vez."
			}else{
				aviso.innerText = 'Por favor, selecione um animal.'
			}
			
		} 
	}

	async function updateAnimal(){
		const user_id = localStorage.user;
		let aviso = document.querySelector("div#errSelect");

		const response = await api.put(`/edit-animal/${animalID}`,{ nomeEdit, tipoEdit, racaEdit }, { headers: { user_id } })

		if(!response.data.erro){
			const newAnimalList = await api.get("/animal-list", {headers: {user_id}});
			aviso.classList.remove("hidden");
			aviso.classList += "accessNoSelect"
			aviso.innerText = "Edição realizada com sucesso."
			setAnimal(newAnimalList.data)
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
		for(let c = 0; c < animal.length; c++){
			document.querySelector(`#checkAnimal-${c}`).checked = false;
			animal_id.splice(0,1)
		}
	}

	function closeModalDestroy(){
		modalDestroy.classList.remove("mostrar");

		document.querySelector("input#selectAll").checked = false;
		for(let c = 0; c < animal.length; c++){
			document.querySelector(`#checkAnimal-${c}`).checked = false;
		}
		animal_id = []

	}

	async function destroyAnimal(){
		let indexValue = []
		let ani_id = JSON.stringify(animal_id)
		let aviso = document.querySelector("div#errSelect");

		if(animal_id.length > 0){
			animal.map((animal, index) => {
				return animal_id.map(value => value === animal._id ?	indexValue.push(index) : null);
			});
			indexValue.map(value => document.querySelector(`tr#animal-${value}`).className = "hidden"
			)
			const response = await api.delete("/destroy-animal", {headers: { ani_id }})

			if(response.data.erro){
				aviso.className = "errNoSelect"
				aviso.innerText = `${response.data.erro}`
			}
			closeModalDestroy()
		}
	}

	async function handleSubmit(e){
		e.preventDefault()
	}

	function goToHome(){
		history.push("/");
	} 
	function goToNew(){
		history.push("/new-animal");
	}
	function logout(){
		localStorage.removeItem("user");
		history.push("/");
	}
	function goToSchedule(){
		history.push("/schedule-list");
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
						<button id="entrar" onClick={goToSchedule}>meus agendamentos</button>
            <button id="entrar" onClick={goToPerfil}>meu perfil</button>
						<button id="homeLogin" onClick={goToHome}>página inicial</button>
						<button id="logout" onClick={logout}>sair</button>
					</div>
				</nav>
				<div id="headerAnimal">
					<img src={AnimalList} alt="Logo animal"/>
					<h2>Seus Pets</h2>
				</div>

				<div id="noAnimal"></div>
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
							<th>Nome do pet</th>
							<th>Tipo</th>
							<th>Raça</th>
						</tr>
					</thead>
					<tbody>
						{animal.map((animal, index) => {
							return (
							<tr id={`animal-${index}`} key={animal._id}>
								<td className="just-right minimize-80">
									<input 
										type="checkbox" 
										className="checkbox" 
										name={`checkAnimal-${index}`} 
										id={`checkAnimal-${index}`} 
										onClick={() => getAnimal(animal._id)}/>
									<label htmlFor={`checkAnimal-${index}`}></label>
								</td>
								<td>{animal.nome}</td>
								<td>{animal.tipo}</td>
								<td>{animal.raca}</td>
							</tr>
							)
						})}
					</tbody>
				</table>
				<div id="footerAnimal">
					<div id="errSelect"></div>
					<button id="novoPet" onClick={goToNew}>
						<img src={newAni} alt="Novo pet"/>
						novo pet
					</button>
					<button id="apagar" onClick={openModalDestroy}>
						<img src={eraser} alt="Apagar"/>
						apagar
					</button>
					<button id="editar"  onClick={updateAnimalModal}>
						<img src={edit} alt="Editar"/>
						editar
					</button>
					<button id="voltar" onClick={goToHome}>
						<img src={back} alt="Voltar"/>
						voltar
					</button>
				</div>
			</div>
			<div id="modal-container" className="modal-container">
				<div id="modal" className="modal">
					<form onSubmit={handleSubmit}>
						{/* <div id="titulo">
								<img src={animalLogo} alt="Usuário"/>
								<h2>Cadastro de Animal</h2>
						</div> */}
						{/* <select name="animal" id="animal">
							{animal.map((value, index) => {
								return(
									<option value={value._id} key={index}>{value.nome}</option>
								)
							})}
						</select> */}
						<input 
								id="nome"
								type="text"
								placeholder="Nome do Pet"
								value={nomeEdit}
								onChange={(event => setNomeEdit(event.target.value))}
						/>
						<input 
								type="text"
								placeholder="Tipo de Pet"
								value={tipoEdit}
								onChange={(event => setTipoEdit(event.target.value))}
						/>
						<input 
								type="text"
								placeholder="Raça do Pet"
								value={racaEdit}
								onChange={(event => setRacaEdit(event.target.value))}
						/>
						<div id="sub-btn">
								<button id="fim" onClick={closeModal}>voltar</button>
								<button type="submit" id="novo" onClick={updateAnimal}>editar</button>
						</div>
					</form>
				</div>
			</div>
			<div id="modal-container-destroy" className="modal-container">
				<div className="modal">
					<h3>Tem certeza que deseja deletar os animais selecionados?</h3>
					<div id="sub-btn">
						<button id="nao" onClick={closeModalDestroy}>não</button>
						<button id="sim" onClick={destroyAnimal}>sim</button>
					</div>
				</div>
			</div>
		</>
	)
}