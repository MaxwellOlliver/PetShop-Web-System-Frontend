import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
import Animal from './pages/animalListPage/Animal';
import newAnimal from './pages/newAnimal/newAnimal'
import Schedule from './pages/schedulingPage/Schedule';
import New from './pages/newPage/New';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/new-user" component={New}/>
                <Route path="/new-animal" component={newAnimal}/>
                <Route path="/animal-list" component={Animal}/>
                <Route path="/scheduling" component={Schedule}/>
            </Switch>
        </BrowserRouter>
    )
}