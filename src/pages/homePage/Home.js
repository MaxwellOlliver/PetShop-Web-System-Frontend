import React from 'react';
import '../../App.css';

import Logo from '../../assets/logo-horizontal.svg';
import tosaLogo from '../../assets/servico.svg';
import agendaLogo from '../../assets/agenda.svg';
import equipeLogo from '../../assets/equipe.svg';

export default function Home({ history }){
    function goToLogin(){
        history.push("/login");
    }
    function goToNew(){
        history.push("/new-user");
    }
    return (
        <div className="container bg-yellow">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">
                    <button id="home" disabled>home</button>
                    <button id="entrar" onClick={goToLogin}>fazer login</button>
                </div>
            </nav>
            <div className="welcome-msg">
                <span id="welcome">
                Bem vindo a Pet’scão. Neste site você <br/>poderá conhecer e agendar serviços<br/>conosco, visite a área de agendamento.
                </span>
                <br/>
                <div id="buttons">
                    <button id="entrar" onClick={goToNew}>Criar nova conta</button>
                    <a href="mailto:petscaocompany@gmail.com"><button id="send-email">enviar email</button></a>                    
                </div>
            </div>
            <div className="content">
                <h1>Serviços Pet’scão</h1>
                <span>Abaixo temos alguns serviços que oferecemos aqui na Pet’scão.<br/>Atendemos de Segunda á Sábado das 9 às 20 horas.</span>
                <div id="servicos">
                    <div id="banho-tosa">
                        <img src={tosaLogo} alt="Tosa e Banho"/>
                        <h3>Banho e Tosa</h3>
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