import React from 'react';
import '../../App.css';

import Logo from '../../assets/logo-horizontal.svg';
import tosaLogo from '../../assets/servico.svg';
import sobreLogo from '../../assets/animal-logo-azul.svg';
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

    function goToPerfil(){
        history.push("/me")
    } 
    return (
        <div className="container bg-yellow">
            <nav>
                <img src={Logo} alt="PetsCão" id="homeLogo"/>
                <div id="menu">]
                    <a href="#txtContentSobre">sobre</a>
                    <a href="#txtContentServicos">serviços</a>
                    <a href="#txtContentEquipe">equipe</a>
                    {user_id?<button id="entrar" onClick={goToAnimal}>meus pets</button>: null}
                    {user_id?<button id="entrar" onClick={goToSchedule}>meus agendamentos</button>: null}
                    {user_id?<button id="entrar" onClick={goToPerfil}>meu perfil</button>: null}
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
                        <img src={sobreLogo} alt="Tosa e Banho"/>
                        <h3>Sobre a Pet'sCão</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                    <div id="agendamentos">
                        <img src={tosaLogo} alt="Agenda"/>
                        <h3>Serviços</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                    <div id="equipe">
                        <img src={equipeLogo} alt="Equipe"></img>
                        <h3>Equipe</h3>
                        <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</span>
                    </div>
                </div>
            </div>
            <div className="sobre">
                <div id="imgSobre"></div>
                <div id="txtContentSobre">
                    <h3>Sobre a Pet's Cão</h3><br></br>
                    <span>Trabalhamos para que você e seus pets tenham a melhor experiência em nossas lojas, seja através dos serviços de estética ou pela variedade de produtos da loja para cães, gatos, peixes, aves, roedores, répteis. <br/><br/><strong>Nossa Missão:</strong> Criar valor na interação com os apaixonados por animais de estimação, potencializando o bem da relação entre o pet e sua família.<br/><br/><strong>Nossa Visão:</strong> Ser a maior e uma das melhores redes de pet shops da América Latina.<br/><br/><strong>Nossos Valores:</strong> Somos apaixonados por pets<br></br>• Respeitamos uns aos outros<br></br>• Reconhecemos esforços, premiamos resultados<br></br>• Encantamos nossos clientes<br></br>• Temos prazer em servir.</span>
                </div>
            </div>
            <div className="servicos">
                <div id="imgServicos"></div>
                <div id="txtContentServicos">
                    <h3>Serviços</h3>
                    <span><br/><br/><strong>Nossa Missão:</strong> Criar valor na interação com os apaixonados por animais de estimação, potencializando o bem da relação entre o pet e sua família.<br/><br/><strong>Nossa Visão:</strong> Ser a maior e uma das melhores redes de pet shops da América Latina.<br/><br/><strong>Nossos Valores:</strong> Somos apaixonados por pets<br></br>• Respeitamos uns aos outros<br></br>• Reconhecemos esforços, premiamos resultados<br></br>• Encantamos nossos clientes<br></br>• Temos prazer em servir.</span>
                </div>
            </div>
            <div className="equipe">
                <div id="imgEquipe"></div>
                <div id="txtContentEquipe">
                    <h3>Equipe</h3>
                    <span><br/><br/><strong>Nossa Missão:</strong> Criar valor na interação com os apaixonados por animais de estimação, potencializando o bem da relação entre o pet e sua família.<br/><br/><strong>Nossa Visão:</strong> Ser a maior e uma das melhores redes de pet shops da América Latina.<br/><br/><strong>Nossos Valores:</strong> Somos apaixonados por pets<br></br>• Respeitamos uns aos outros<br></br>• Reconhecemos esforços, premiamos resultados<br></br>• Encantamos nossos clientes<br></br>• Temos prazer em servir.</span>
                </div>
            </div>
        </div>
    )
}