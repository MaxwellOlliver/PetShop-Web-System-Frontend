import React, { useEffect, useState } from 'react';

import Logo from '../../assets/logo-horizontal.svg';
import AnimalList from '../../assets/animal-list.svg';
import eraser from '../../assets/eraser_icon.svg';
import edit from '../../assets/edit_icon.svg';
import back from '../../assets/back_icon.svg';
import api from '../../services/api';

export default function Animal({history}){
	const [ animal, setAnimal ] = useState([]);
	const [ nomeEdit, setNomeEdit ] = useState("");
	const [ tipoEdit, setTipoEdit ] = useState("");
	const [ racaEdit, setRacaEdit ] = useState("");
	let modal = document.querySelector("div#modal-container");
	var animal_id = [];

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

		if(animal_id.length > 0){
			aviso.classList.remove("hidden")
			aviso.classList.add("hidden")
			aviso.innerText = ""
		}
		console.log(animal_id)
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

	async function updateAnimal(){
		let aviso = document.querySelector("div#errSelect");
		if(animal_id.length === 1){
			const [ ani_id ] = animal_id 

			const response = await api.get("/animal-list", {headers: {ani_id}});

			if(!response.data.erro){
				setNomeEdit(response.data.nome);
				setTipoEdit(response.data.tipo);
				setRacaEdit(response.data.raca);
			}else{
				//
			}
			modal.classList.add("mostrar");
			animal_id.splice(1,1)

		}else{
			aviso.className = "errNoSelect"
			if(animal_id.length > 1){
				aviso.innerText = "Selecione um de cada vez."
			}else{
				aviso.innerText = 'Por favor, selecione um animal.'
			}
			
		} 
	}

	function closeModal(){
		modal.classList.remove("mostrar");
		// document.querySelector("#checkAnimal-0").checked = false;
		// document.querySelector("#checkAnimal-1").checked = false;
		for(let c = 0; c < animal.length; c++){
			document.querySelector(`#checkAnimal-${c}`).checked = false;
		}
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
		} else {
			aviso.className = "errNoSelect"
			aviso.innerText = "Por favor, selecione um animal."
		}	
	}

	function containerClose(e){
		if(e.target.id === "modal-container"){
			modal.classList.remove("mostrar");

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
	return (
		<>
			<div className="container">
				<nav>
					<img src={Logo} alt="PetsCão" id="homeLogo"/>
					<div id="menu">
						<button id="homeLogin" onClick={goToHome}>home</button>
						<button id="entrarLogin" disabled>seus animais</button>
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
							<th></th>
							<th>Nome do pet</th>
							<th>Tipo</th>
							<th>Raça</th>
						</tr>
					</thead>
					<tbody>
						{animal.map((animal, index) => {
							return (
							<tr id={`animal-${index}`} key={animal._id}>
								<td className="just-right">
									<input type="checkbox" className="checkbox" name={`checkAnimal-${index}`} id={`checkAnimal-${index}`} onClick={() => getAnimal(animal._id)}/>
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
					<button id="apagar" onClick={destroyAnimal}>
						<img src={eraser} alt="Apagar"/>
						apagar
					</button>
					<button id="editar"  onClick={updateAnimal}>
						<img src={edit} alt="Editar"/>
						editar
					</button>
					<button id="voltar" onClick={goToMenu}>
						<img src={back} alt="Voltar"/>
						voltar
					</button>
				</div>
			</div>
			<div id="modal-container" className="modal-container" onClick={containerClose}>
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
								<button type="submit" id="novo">editar</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}