import React from 'react';
import '../../App.css';

import Logo from '../../assets/logo-horizontal.svg';
import tosaLogo from '../../assets/servico.svg';
import agendaLogo from '../../assets/agenda.svg';
import equipeLogo from '../../assets/equipe.svg';

export default function Home({ history }){
    const user_id = localStorage.getItem("user")

    function logout(){
        localStorage.removeItem("user")
        window.location.reload()
    }

    function goToLogin(){
        history.push("/login");
    }
    function goToNew(){
        history.push("/new-user");
    }
    function goToNewSchedule(){
        history.push("/new-schedule");
    }

    function goToAnimal(){
        history.push("/animal-list");
    }
    function goToSchedule(){
        history.push("/schedule-list");
    }
    return (
        <div className="container bg-yellow">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">]
                    <a href="#sobre">sobre</a>
                    <a href="#agendamentos">agendamentos</a>
                    <a href="#equipe">equipe</a>
                    {user_id?<button id="entrar" onClick={goToAnimal}>meus pets</button>: null}
                    {user_id?<button id="entrar" onClick={goToSchedule}>meus agendamentos</button>: null}
                    <button id="entrar" onClick={user_id? logout:goToLogin}>{user_id ? "sair": "fazer login"}</button>
                </div>
            </nav>
            <div className="welcome-msg">
                <span id="welcome">
                Bem vindo a Pet’scão. Neste site você <br/>poderá conhecer e agendar serviços<br/>conosco, visite a área de agendamento.
                </span>
                <br/>
                <div id="buttons">
                    <button id="entrar" onClick={user_id?goToNewSchedule:goToNew}>{user_id?"Criar agenadamento":"Criar uma conta"}</button>
                    <a href="mailto:petscaocompany@gmail.com"><button id="send-email">enviar email</button></a>                    
                </div>
            </div>
            <div className="content">
                <h1>Serviços Pet’scão</h1>
                <span>Abaixo temos alguns serviços que oferecemos aqui na Pet’scão.<br/>Atendemos de Segunda á Sábado das 9 às 20 horas.</span>
                <div id="servicos">
                    <div id="sobre">
                        <img src={tosaLogo} alt="Tosa e Banho"/>
                        <h3>Sobre a Pet'sCão</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                    <div id="agendamentos">
                        <img src={agendaLogo} alt="Agenda"/>
                        <h3>Agendamento</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                    <div id="equipe">
                        <img src={equipeLogo} alt="Equipe"></img>
                        <h3>Equipe</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}