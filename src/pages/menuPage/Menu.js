import React from 'react';

import Logo from '../../assets/logo-horizontal.svg';
import animalLogo from '../../assets/animal-menu.svg';
import scheduleLogo from '../../assets/agenda-menu.svg';

export default function Menu({ history }){
  function isLogged(){
		const _id = localStorage.getItem("user");
		if(!_id){
				history.push("/login")
		}
	}

  function goToHome(){
    history.push("/");
  }

  function goToAnimalList(){
    history.push("/animal-list")
  }

  function goToScheduleList(){
    history.push("/schedule-list")
  }
  
  return(
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
        <div id="menuButtons">
          <button id="seusAnimais" onClick={goToAnimalList}><img src={animalLogo} alt="Animal logo"/> Seus Animais</button>
          <button id="ver" onClick={goToScheduleList}><img src={scheduleLogo} alt="See schedule"/>Agendamentos</button>
          <span>• Seus Pets trás a lista de Pets cadastrados, e você poderá adicionar ou remover um Pet.<br/>• Ver Agendamentos, você poderá consultar o dia e hora dos serviços que agendou conosco.</span>
        </div>
      </div>
    </div>
  )
}