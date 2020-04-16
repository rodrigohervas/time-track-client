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
import ptosummary from './static-data/ptosummary'
import UpdateHours from './Timeframes/UpdateHours'
import UpdatePto from './Pto/UpdatePto'
import AuthWrapper from './Authentication/AuthWrapper'
import ComponentError from './ErrorManagement/ComponentError'
import { getDays } from './helpers/helper'
import config from './config'
import ErrorMessage from './ErrorManagement/ErrorMessage'
require('dotenv').config()


function App() {

  const [hourLogs, setHourLogs] = useState([])
  const [ptoRequests, setPtoRequests] = useState([])
  const [ptoSummary, setPtoSummary] = useState({})
  const [isLogged, setIsLogged] = useState(localStorage.getItem('username') !== null)
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)
  const history = useHistory()

  const user_id = localStorage.getItem('user_id')

  const fetchAPI = (verb, url, body, callbackFunction) => {
    
    const options = { 
      method: verb,
      headers: {
          'content-type': 'application/json', 
          'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
      }
    };

    if(body) {
      options.body = JSON.stringify(body)
    }

      fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw Error( `No data available`)
        }
        return res.json()
      })
      .then(data => {
        //console.log('API FETCH response: ', data)

        callbackFunction(data)
        setError(null)
      })
      .catch(error => { 
        setError(error)
        setShowError(true)
      })
  }


  useEffect( () => {
    if(user_id) {
      fetchAPI('POST', `${config.REACT_APP_API_URL_TIMEFRAMES}/${user_id}`, null, setHourLogs)
      fetchAPI('POST', `${config.REACT_APP_API_URL_PTOS}/${user_id}`, null, setPtoRequests)
      fetchAPI('GET', `${config.REACT_APP_API_URL_PTODAYS}/${user_id}`, null, setPtoSummary)
    }
  }, [user_id])


  const handleLogHours = (log) => {
    //update Timeframes
    const newHourLogs = [...hourLogs, log]
    setHourLogs(newHourLogs)
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
  

  const handleRequestPto = (pto) => {
    //update pto Requests
    const newPtoRequests = [...ptoRequests, pto]
    setPtoRequests(newPtoRequests)
    
    //update ptoSummary state
    const days = getDays(pto.startdate, pto.finishdate)
    const newSummary = {...ptoSummary}
    newSummary.availabledays -= days
    newSummary.useddays += days
    handleUpdatePtoSummary(newSummary)
  }

  const handlePtoUpdate = (pto) => {
    //update pto requests
    const originalPto = ptoRequests.filter( ptoRequest => ptoRequest.id === pto.id)[0]
    const ptoList = ptoRequests.filter( ptoRequest => ptoRequest.id !== pto.id)
    const newPtoRequests = [...ptoList, pto]
    setPtoRequests(newPtoRequests)

    //update pto Summary
    const originalDays = getDays(originalPto.startdate, originalPto.finishdate)
    const newDays = getDays(pto.startdate, pto.finishdate)
    const newSummary = {...ptoSummary}
    newSummary.availabledays = ptoSummary.availabledays + originalDays - newDays
    newSummary.useddays = ptoSummary.useddays - originalDays + newDays
    handleUpdatePtoSummary(newSummary)    
  }

  const handleDeletePto = (id) => {
    const ptoList = ptoRequests.filter( pto => pto.id !== id)
    setPtoRequests(ptoList)

    //update pto Summary
    const deletedPto = ptoRequests.filter(pto => pto.id === id)[0]
    const days = getDays(deletedPto.startdate, deletedPto.finishdate)
    const newSummary = {...ptoSummary}
    newSummary.availabledays += days
    newSummary.useddays -= days
    handleUpdatePtoSummary(newSummary)
  }  

  const handleUpdatePtoSummary = (newSummary) => {
    const url = `${config.REACT_APP_API_URL_PTODAYS}/${user_id}`
    fetchAPI('PUT', url, newSummary, setPtoSummary)
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
                { showError && <ErrorMessage message={error} /> }
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
