import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import './style/App.css'
import Nav from './Navigation/Nav'
import Footer from './Navigation/Footer'
import Landing from './Landing'
import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
import Dashboard from './Dashboard'
import LogHours from './Timeframes/LogHours'
import PtoRequest from './Pto/PtoRequest'
import hourlogs from './static-data/hourLogs'
import ptorequests from './static-data/ptoRequests'
import ptosummary from './static-data/ptosummary'
import UpdateHours from './Timeframes/UpdateHours'
import UpdatePto from './Pto/UpdatePto'
import AuthWrapper from './Authentication/AuthWrapper'
import ComponentError from './ErrorManagement/ComponentError'
import { getDays } from './helpers/helper'
import config from './config'
require('dotenv').config()


function App() {

  const [hourLogs, setHourLogs] = useState([])
  const [ptoRequests, setPtoRequests] = useState([])
  const [ptoSummary, setPtoSummary] = useState({})
  const [isLogged, setIsLogged] = useState(localStorage.getItem('username') !== null)
  const [error, setError] = useState(null)
  const history = useHistory()

  const getAPIData = (url, callbackFunction) => {
    const options = { 
      method: 'GET',
      headers: {
          'content-type': 'application/json', 
          'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'), 
        password: localStorage.getItem('password')
      })
  };
    fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      callbackFunction(data)
      setError(null)
    })
    .catch(error => setError(error))
  }

  useEffect( () => {
    //getAPIData(config.REACT_APP_API_URL_TIMEFRAMES, setHourLogs)
    setHourLogs(hourlogs)
    setPtoRequests(ptorequests)
    setPtoSummary(ptosummary)
  }, [])

  const handleLogHours = (log) => {
    const lastId = hourLogs.slice(-1)[0].id
    log.id = lastId + 1
    const newHourLogs = [...hourLogs, log]
    setHourLogs(newHourLogs)
  }

  const handleRequestPto = (pto) => {
    //update pto Requests
    const lastId = ptoRequests.slice(-1)[0].id
    pto.id = lastId + 1
    const newPtoRequests = [...ptoRequests, pto]
    setPtoRequests(newPtoRequests)
    
    //update pto Summary
    const days = getDays(pto.startDate, pto.finishDate)
    const newSummary = {...ptoSummary}
    newSummary.availableDays = ptoSummary.availableDays - days
    newSummary.usedDays = ptoSummary.usedDays + days
    setPtoSummary(newSummary)
  }

  const handleHourUpdate = (hourLog) => {
    const hourLogsList = hourLogs.filter( hourlog => hourlog.id !== hourLog.id)
    const newHourLogs = [...hourLogsList, hourLog]
    setHourLogs(newHourLogs)
  }

  const handleDeleteHours = (id) => {
    const hourLogsList = hourLogs.filter( hourlog => hourlog.id !== id )
    setHourLogs(hourLogsList)
  }

  const handlePtoUpdate = (pto) => {
    //update pto requests
    const originalPto = ptoRequests.filter( ptoRequest => ptoRequest.id === pto.id)[0]
    const ptoList = ptoRequests.filter( ptoRequest => ptoRequest.id !== pto.id)
    const newPtoRequests = [...ptoList, pto]
    setPtoRequests(newPtoRequests)

    //update pto Summary
    const originalDays = getDays(originalPto.startDate, originalPto.finishDate)
    const newDays = getDays(pto.startDate, pto.finishDate)
    const newSummary = {...ptoSummary}
    newSummary.availableDays = ptoSummary.availableDays + originalDays - newDays
    newSummary.usedDays = ptoSummary.usedDays - originalDays + newDays
    setPtoSummary(newSummary)
  }

  const handleDeletePto = (id) => {
    const ptoList = ptoRequests.filter( pto => pto.id !== id)
    setPtoRequests(ptoList)

    //update pto Summary
    const deletedPto = ptoRequests.filter(pto => pto.id === id)[0]
    const days = getDays(deletedPto.startDate, deletedPto.finishDate)
    const newSummary = {...ptoSummary}
    newSummary.availableDays = ptoSummary.availableDays + days
    newSummary.usedDays = ptoSummary.usedDays - days
    setPtoSummary(newSummary)
  }

  const handleIsLogged = (bool) => {
    setIsLogged(bool)
  }

  return (
    <div className="app">
      <header>
        <ComponentError>
          <Nav isLogged={isLogged} handleIsLogged={handleIsLogged} />
        </ComponentError>
      </header>
      <div className="main-container">
        <Switch>
          <Route exact path="/">
            <ComponentError>
              <Landing />
            </ComponentError>
          </Route>
          <Route path="/signin">
            <ComponentError>
              <SignIn isLogged={handleIsLogged} />
            </ComponentError>
          </Route>
          <Route path="/signup">
            <ComponentError>
              <SignUp isLogged={handleIsLogged} />
            </ComponentError>
          </Route>
          <AuthWrapper>
            <Route path="/dashboard">
              <ComponentError>
                <Dashboard hourLogs={hourLogs} 
                          ptoRequests={ptoRequests} 
                          ptoSummary={ptoSummary} 
                          handleDeleteHours={handleDeleteHours} 
                          handleDeletePto={handleDeletePto} />
              </ComponentError>
            </Route>
            <Route path="/loghours">
              <ComponentError>
                <LogHours handleLogHours={handleLogHours} />
              </ComponentError>
            </Route>
            <Route path="/updateHours/:id">
              <ComponentError>
                <UpdateHours 
                  hourLog={hourLogs.filter( hourLog => hourLog.id === history.location.hourId)[0]} 
                  handleHourUpdate={handleHourUpdate} />
              </ComponentError>
            </Route>
            <Route path="/ptorequest">
              <ComponentError>
                <PtoRequest ptoSummary={ptoSummary} handleRequestPto={handleRequestPto} />
              </ComponentError>
            </Route>
            <Route path="/updatePto/:id">
              <ComponentError>
                <UpdatePto 
                  pto={ptoRequests.filter( pto => pto.id === history.location.ptoId)[0]} 
                  handlePtoUpdate={handlePtoUpdate} />
              </ComponentError>
            </Route>
          </AuthWrapper>

        </Switch>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
