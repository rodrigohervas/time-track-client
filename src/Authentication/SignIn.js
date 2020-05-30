import React, { useState, useEffect } from 'react'
import './../style/signin.css'
import { NavLink, useHistory } from 'react-router-dom'
import { showHide } from './../helpers/helper'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import config from './../config'

/**
 * Sign-in form component
 * @param {object} props 
 */
function SignIn(props) {

    //variable declarations
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')

    const [UsernameError, setUsernameError] = useState(false)
    const [PasswordError, setPasswordError] = useState(false)
    
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    
    const history = useHistory()

    /** 
     * useEffect hook: clears localStorage if there's no username/password in localStorage
     */
    useEffect(() => {
        if(username !== '' && password !== '') {
            localStorage.clear()
        }
    }, [username, password])

    /**
     * event manager to set state to the changes in inputs
     * @param {event} e 
     */
    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    /**
     * event handler to set errors changes in inputs onBlur
     * @param {event} e 
     */
    const validateInput = (e) => {
        if (!username.includes('@') || !username) {
            setUsernameError(true)
        }
        else { 
            setUsernameError(false)
        }

        if (!password || password.length < 3) {
            setPasswordError(true)
        }
        else { 
            setPasswordError(false)
        }
    }

    /**
     * validator to check if username or password have an error.
     * Called from submit handler
     */
    const isValid = () => {
        if(UsernameError || PasswordError) {
            return false
        }        

        return true
    }

    /**
     * function to clear errors after sign-in is done
     */
    const clearErrors = () => {
        setUsernameError(false)
        setPasswordError(false)
        setError(false)
    }

    /**
     * fetch that gets the user from the API and stores it in localStorage
     * @param {object} user 
     */
    const manageUser = (user) => {
        const url = config.REACT_APP_API_URL_LOGIN
        const authorization = `Bearer ${config.REACT_APP_API_KEY}`

        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
                'Authorization': authorization
            },
            body: JSON.stringify(user)
        };

        //add loader
        showHide('loader');

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw Error( 'Oops, something went wrong...')
                }
                return res.json()
            })
            .then(userDB => {
                if(userDB) {
                    //set user data in localStorage
                    localStorage.setItem('user_id', userDB.id)
                    localStorage.setItem('username', userDB.username)
                    localStorage.setItem('password', userDB.password)
                    localStorage.setItem('role_id', userDB.role_id)
                    localStorage.setItem('company_id', userDB.company_id)

                    //update sign-in state in App.js
                    isLogged(true)

                    clearErrors()

                    //hide loader
                    showHide('loader');
                    
                    history.push('/dashboard')
                }
            })
            .catch(error => {
                setError(error)
                setShowError(true)

                //hide loader
                showHide('loader');
            })
    }

    /**
     * onSubmit event handler for the sign-in form
     * calls manageUser() 
     * @param {event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        if(isValid()) {
            const user = {
                username: username, 
                password: password
            }

            manageUser(user)
        }
    }
    
    /**
     * render prop to update sign-in state in App.js
     */ 
    const { isLogged } = props

    return (
        <section className="form-container">
            <form className="signin-form" onSubmit={e => handleSubmit(e)} >
                <div className="form-group">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input type="text" name="username" id="username" placeholder="john@doe.com" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                    {UsernameError && <FormErrorMessage message={'invalid username'}/>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" name="password" id="password" placeholder="your password" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                    {PasswordError && <FormErrorMessage message={'invalid password'}/>}
                </div>

                <div className="form-group">
                    <input className="submit" type="submit" value="Sign In" />
                </div>

                <div className="form-group">
                    <NavLink to="/signup" >Sign Up</NavLink>
                </div>

                <div id="loader" className="loader"></div>

                <div>
                    <br /><br />
                    <p><b>Test user:</b> michael@jones.com</p>
                    <p><b>Test password:</b> michael</p>
                </div>
                
                { showError && <ErrorMessage message={error}/> }

            </form>
            
        </section>
    )
}

export default SignIn