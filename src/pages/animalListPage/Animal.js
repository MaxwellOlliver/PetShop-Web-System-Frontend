import React, { useEffect, useState } from 'react';

import Logo from '../../assets/logo-horizontal.svg';
import AnimalList from '../../assets/animal-list.svg';
import eraser from '../../assets/eraser_icon.svg';
import edit from '../../assets/edit_icon.svg';
import back from '../../assets/back_icon.svg';
import api from '../../services/api';

export default function Animal({history}){
	const [ animal, setAnimal ] = useState([]);
	var animal_id = [];
	
	function getAnimal(id){
		let alreadyHave = animal_id.includes(id)

		if(!alreadyHave){
			animal_id.push(id);
		}

	}

	useEffect(()=>{
		const user_id = localStorage.getItem('user')
		async function loadAnimals(){
			const response = await api.get("/animal-list", {headers:{user_id}})

			setAnimal(response.data)
		}
		loadAnimals()
	},[])

	function updateAnimal(){
		console.log("ativo")
	}
	function destroyAnimal(){
		console.log("ativo")
	}

	function goToMenu(){
		history.push("/menu");
	}

	function goToHome(){
		history.push("/");
	}
	return (
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
	)
}