import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

function Nav(props) {

    // const isUserLogged = () => {
    //     return false;
    // }

    return (
        <div className="nav">
            <div className="logo">
                {'Time Track logo'}
            </div>
            <div className="menu">
                <NavLink className="navlink" to="/signin">
                    {'Sign In'}
                </NavLink>
                <NavLink className="navlink" to="/dashboard">
                    {'DashBoard'}
                </NavLink>
                <NavLink className="navlink" to="/loghours">
                    {'Log Hours'}
                </NavLink>
                <NavLink className="navlink" to="/ptorequest">
                    {'request PTO'}
                </NavLink>
            </div>
        </div>
    )
}

export default Nav