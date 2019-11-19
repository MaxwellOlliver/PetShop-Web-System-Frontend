import React from 'react';

import Logo from '../../assets/logo-horizontal.svg';

export default function Menu({ history }){
  function goToHome(){
    history.push("/");
  }
  return(
    <div className="container">
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
          <button id="seusAnimais">Seus Animais</button>
          <button id="agendarServico">Agendar Serviço</button>
          <button id="ver">Ver Agendamentos</button>
          <span>• Seus Pets trás a lista de Pets cadastrados, e você poderá adicionar ou remover um Pet.<br/>• Agendar serviço, você poderá marcar o dia e hora do serviço que será prestado ao seu pet.<br/>• Ver Agendamentos, você poderá consultar o dia e hora dos serviços que agendou conosco.</span>
        </div>
      </div>
    </div>
  )
}