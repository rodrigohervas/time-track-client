import React from 'react'
import { NavLink } from 'react-router-dom'
import './../style/footer.css'

function Footer(props) {

    
    return (
        <div className="footer">
            <div className="info">
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
            </div>
        </div>
    )
}

export default Footer