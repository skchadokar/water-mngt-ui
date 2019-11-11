import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Workorder from './Workorder';
import './css/App.css';
import './css/select-box.css';
import Home from '../components/Home';

import Img from 'react-image';
import {FetchService} from '../helpers/fetch/services/service';
import createHistory from "history/createBrowserHistory";

import logo1 from '../helpers/img/shriganga.png';

const history = createHistory()

const Main = () => (
  
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/order' component={Workorder}></Route>
        <Route exact path='/help' component={Login}></Route>
        <Route exact path='/home' component={Home}></Route>
      </Switch>
    );


class App extends Component {

  constructor(props){
    super(props);
    let mURL = window.location.href;
      this.state={
      
        user: mURL.endsWith('/') || mURL.endsWith('/login')?'':localStorage.getItem('user'),
       }
    this.fetchService = new FetchService();
  }

  logOutHandler = () => {
    this.fetchService.getLogoutService();
    history.push('/login');
    history.go();
  }

  helpHendler = () => {
    alert();
  }

  render() {
    return (
      <div className='app'>
       <header >  
      
         <Img src ={logo1} height="90px" width="800px"/>
       <span className="userName">{ this.state.user !==''? "Hi "  :null} {this.state.user} </span>
       </header>
       <hr id='hrId'/>
       <Main />
      </div>
    );
  }
}

export default App;
