import React from 'react'
import { NavLink } from 'react-router-dom'
import { closeMenu } from './../helpers/helper'
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

    /* event handler that manages hamburger and menu visibility on hamburger click  */
    const handleHamburger = () => {
        const element = document.querySelector('div.hamburger');
        element.classList.toggle('change');

        /* Menu visibility on click */
        const menu = document.querySelector('div.menu');
        menu.classList.toggle('showMenu');
    };

    const {isLogged, handleIsLogged} = props
    
    //sets the SignIn/SignOut title in the nav button dependening on the state passed from App.js in isLogged prop
    title = isLogged ? 'Sign Out' : 'Sign In'
    
    return (
        <div className="nav">
            <div className="logo">
                <img src={logo} alt="TimeTrack logo" />
            </div>

            <div className="hamburger" onClick={() => handleHamburger()}>
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
            </div>

            <div className="menu">
                <NavLink className="navlink" to="/" onClick={() => closeMenu()}>
                    {'Landing'}
                </NavLink>
                <NavLink className="navlink" to="/dashboard" onClick={() => closeMenu()}>
                    {'DashBoard'}
                </NavLink>
                <NavLink className="navlink" to="/loghours" onClick={() => closeMenu()}>
                    {'Log Hours'}
                </NavLink>
                <NavLink className="navlink" to="/ptorequest" onClick={() => closeMenu()}>
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