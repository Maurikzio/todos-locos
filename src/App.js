import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './layout/layout';
import Home from './components/home/home';
import Todos from './components/todos/todos';
import Login from './components/auth/login/login';
import Sigunp from './components/auth/signup/signup'
import Logout from './components/auth/logout/logout';


function App({ loggedIn }) {
  console.log(loggedIn);
  let routes;
  if(loggedIn){
    routes = (
        <Switch>
          {/* <Route exact path='/todos-locos' component={Home} /> */}
          <Route exact path='/todos-locos/' component={Todos} />
          <Route path='/todos-locos/logout' component={Logout} />
          <Redirect to = '/todos-locos'/>
        </Switch>
    )
  }else{
    routes = (
        <Switch>
          <Route path='/todos-locos/login' component={Login} />
          <Route path='/todos-locos/signup' component={Sigunp} />
          <Redirect to = '/todos-locos/login'/>
        </Switch>
    )
  }

  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  )
}

const mapStateToProps = ({ firebase}) => ({
  loggedIn: firebase.auth.uid ? true : null
})

export default connect(mapStateToProps)(App);
