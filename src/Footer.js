import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

function Footer(props) {

    
    return (
        <div className="footer">
            <div className="info">
                <NavLink className="navlink" to="/signin">
                    {'Sign In'}
                </NavLink>
                <NavLink className="navlink" to="/dashboard">
                    {'DashBoard'}
                </NavLink>
                <NavLink className="navlink" to="/loghours">
                    {'Log Hours'}
                </NavLink>
                <NavLink className="navlink" to="/requestpto">
                    {'request PTO'}
                </NavLink>
            </div>
        </div>
    )
}

export default Footer