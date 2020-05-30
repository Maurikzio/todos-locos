import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './layout/layout';
import Home from './components/home/home';
//import Todos from './components/todos/todos';
import Login from './components/auth/login/login';
import Sigunp from './components/auth/signup/signup'
import Logout from './components/auth/logout/logout';
import VerifyEmail from './components/auth/verifyEmail/verifyEmail';
import RecoverPassword from './components/auth/recoverPassword/recoverPassword';
import Profile from './components/auth/profile/profile';

const Todos = React.lazy(() => import('./components/todos/todos'))



function App({ loggedIn, emailVerified }) {
  // console.log(`email verified: ${emailVerified}`);
  // console.log(`logged in: ${loggedIn}`);

  let routes;

  if(loggedIn && !emailVerified){
    routes = (
      <Switch>
        <Route exact path='/todos-locos/verify-email' component={VerifyEmail}/>
        <Route exact path='/todos-locos/logout' component={Logout} />
        <Redirect to = '/todos-locos/verify-email'/>
      </Switch>
    )
  }else if(loggedIn && emailVerified){
    routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/todos-locos/' component={Todos} />
          <Route exact path='/todos-locos/logout' component={Logout} />
          <Route exact path='/todos-locos/profile' component={Profile} />
          <Redirect to = '/todos-locos'/>
        </Switch>
      </Suspense>
    )
  }else{
    routes = (
        <Switch>
          <Route exact path='/todos-locos/login' component={Login} />
          <Route exact path='/todos-locos/signup' component={Sigunp} />
          <Route exact path='/todos-locos/recover-password' component={RecoverPassword}/>
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
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified
})

export default connect(mapStateToProps)(App);
