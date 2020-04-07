import React, { useState, useEffect } from 'react'
import './../style/signin.css'
import { NavLink, useHistory } from 'react-router-dom'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import users from '../static-data/users'

function SignUp(props) {

    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const [role, setRole] = useState('')
    const [UsernameError, setUsernameError] = useState(false)
    const [PasswordError, setPasswordError] = useState(false)
    const [RoleError, setRoleError] = useState(false)
    const [Error, setError] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(username !== '' && password !== '') {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
        }
    }, [username, password])

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        else if(e.target.name === 'role') {
            setRole(e.target.value)
        }
    }

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

        if (!role || role === 0) {
            setRoleError(true)
        }
        else { 
            setRoleError(false)
        }
    }

    const isValid = () => {
        if(UsernameError || PasswordError || RoleError) {
            return false
        }

        return true
    }

    const clearErrors = () => {
        setUsernameError(false)
        setPasswordError(false)
        setRoleError(false)
        setError(false)
    }

    //TODO: get user token from DB
    const getUser = (user) => {
        const userInSystem = users.filter(usr => usr.username === user.username && usr.password === user.password)
        return (userInSystem.length > 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isValid()) {
            const user = {
            username: username, 
            password: password, 
            role: role
            }

            //TODO: create user in DB

            //TODO: save user token in localStorage
            if(getUser(user)) {
                //localStorage.setItem('token', token)
                localStorage.setItem('username', user.username)
                localStorage.setItem('password', password) //TODO: Encode password
                isLogged(true)
                history.push('/dashboard')
            }
            else {
                setError(true)
            }

            //clear errors
            clearErrors()
        }
    }

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
                    {UsernameError && <ErrorMessage message={'invalid username'}/>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" name="password" id="password" placeholder="your password" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                    {PasswordError && <ErrorMessage message={'invalid password'}/>}
                </div>

                <div className="form-group">
                    <label htmlFor="reason">
                        Position:
                    </label>
                    <select id="role" name="role" 
                            onBlur={e => validateInput(e)}
                            onChange={e => handleChange(e)}>
                        <option value="0">Select role</option>
                        <option value="1">Team Member</option>
                        <option value="2">Manager</option>
                    </select>
                    {RoleError && <ErrorMessage message={'Role must be selected'}/>}
                </div>

                <div className="form-group">
                    <input className="submit" type="submit" value="Sign Up" />
                    {Error && <ErrorMessage message={'Error creating user.'} />}
                </div>

                <div className="form-group">
                    <NavLink to="/signin" >Sign In</NavLink>
                </div>
            </form>
        </section>
    )
}

export default SignUp