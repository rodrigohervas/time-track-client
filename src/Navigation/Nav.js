import React from 'react'
import { NavLink } from 'react-router-dom'
import './../style/Nav.css'
import logo from './../img/timetrack-logo-colors.png'

/**
 * Nav component
 * @param {object} props 
 */
function Nav(props) {

    //variable declarations
    let title = 'Sign In'

    /**
     * event handler to set the state of isLogged to the opposite:
     *  - if isLogged: sets to false
     *  - if !isLogged: sets to true
     */
    const handleClick = () => {
        if(isLogged) {
            handleIsLogged(false)
        }
    }

    const {isLogged, handleIsLogged} = props
    
    //sets the SignIn/SignOut title in the nav button dependening on the state passed from App.js in isLogged prop
    title = isLogged ? 'Sign Out' : 'Sign In'
    
    return (
        <div className="nav">
            <div className="logo">
                <img src={logo} alt="TimeTrack logo" />
            </div>
            <div className="menu">
                <NavLink className="navlink" to="/">
                    {'Landing'}
                </NavLink>
                <NavLink className="navlink" to="/dashboard">
                    {'DashBoard'}
                </NavLink>
                <NavLink className="navlink" to="/loghours">
                    {'Log Hours'}
                </NavLink>
                <NavLink className="navlink" to="/ptorequest">
                    {'PTO Request'}
                </NavLink>
                <NavLink name='signin' className="navlink" to="/signin" onClick={() => handleClick()}>
                    {title}
                </NavLink>
            </div>
        </div>
    )
}

export default Nav