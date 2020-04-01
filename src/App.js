import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Footer from './Footer'
import Landing from './Landing'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import LogHours from './LogHours'
import PtoRequest from './PtoRequest'
require('dotenv').config()

function App() {
  return (
    <div className="app">
      <header>
        <Nav />
      </header>
      <div className="main-container">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/loghours">
            <LogHours />
          </Route>
          <Route path="/ptorequest">
            <PtoRequest />
          </Route>
        </Switch>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
