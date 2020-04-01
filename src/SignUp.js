import React from 'react'
import './signin.css'
import { NavLink } from 'react-router-dom'

function SignUp(props) {

    return (
        <section className="form-container">
            <form className="signin-form">
                <div className="form-group">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input type="text" name="username" id="username" placeholder="john@doe.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" name="password" id="password" placeholder="your password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="reason">
                        Position:
                    </label>
                    <select id="reason" name="reason">
                        <option value="1">Select position</option>
                        <option value="2">Team Member</option>
                        <option value="2">Manager</option>
                    </select>
                </div>

                <div className="form-group">
                    <input className="submit" type="submit" value="Sign Up" />
                </div>

                <div className="form-group">
                    <NavLink to="/signin">Sign In</NavLink>
                </div>
            </form>
        </section>
    )
}

export default SignUp