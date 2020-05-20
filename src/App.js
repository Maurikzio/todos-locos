import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './components/home/home';
import Todos from './components/todos/todos';
import Login from './components/auth/login/login';
import Sigunp from './components/auth/signup/signup'



function App() {
  return (
    <BrowserRouter>
      <Layout/>
      <Switch>
        <Route exact path='/todos-locos' component={Home} />
        <Route path='/todos-locos/todos' component={Todos} />
        <Route path='/todos-locos/login' component={Login} />
        <Route path='/todos-locos/signup' component={Sigunp} />
        <Redirect to = '/todos-locos'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
