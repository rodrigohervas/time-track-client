import React from 'react'
import './signin.css'
import { NavLink } from 'react-router-dom'

function SignIn(props) {

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
                    <input className="submit" type="submit" value="Sign In" />
                </div>

                <div className="form-group">
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </form>
        </section>
    )
}

export default SignIn