import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { sessionService } from 'redux-react-session';
import App from '../components/App';
import Home from '../components/Home';
import Login from '../components/Login';
import Workorder from '../components/Workorder';

export default (
  <Route path="/" component={App}>
    <IndexRoute onEnter={sessionService.checkAuth} component={Home} />
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/workorder' component={Workorder}></Route>
        <Route exact path='/home' component={Home}></Route>
    </Route>
);
