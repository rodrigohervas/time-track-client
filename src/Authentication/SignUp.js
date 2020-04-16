import React, { useState, useEffect } from 'react'
import './../style/signin.css'
import { NavLink, useHistory } from 'react-router-dom'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import config from './../config'
import ErrorMessage from './../ErrorManagement/FormErrorMessage'

function SignUp(props) {

    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')
    const [UsernameError, setUsernameError] = useState(false)
    const [PasswordError, setPasswordError] = useState(false)
    const [RoleError, setRoleError] = useState(false)
    const [CompanyError, setCompanyError] = useState(false)
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(username !== '' && password !== '') {
            localStorage.clear()
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
        else if(e.target.name === 'company') {
            setCompany(e.target.value)
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

        if (!company || company.length < 1) {
            setCompanyError(true)
        }
        else { 
            setCompanyError(false)
        }
    }

    const isValid = () => {
        if(UsernameError || PasswordError || RoleError || CompanyError) {
            return false
        }

        return true
    }

    const clearErrors = () => {
        setUsernameError(false)
        setPasswordError(false)
        setRoleError(false)
        setCompanyError(false)
        setError(false)
    }

    const manageUser = (user) => {
        const url = config.REACT_APP_API_URL_USERS
        const authorization = `Bearer ${config.REACT_APP_API_KEY}`

        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
                'Authorization': authorization
            },
            body: JSON.stringify(user)
        };

        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw Error( 'Oops, something went wrong...')
            }
            return res.json()
        })
        .then(userDB => {
            if(userDB) {
                localStorage.setItem('user_id', userDB.id)
                localStorage.setItem('username', userDB.username)
                localStorage.setItem('password', userDB.password)
                localStorage.setItem('role_id', userDB.role_id)
                localStorage.setItem('company_id', userDB.company_id)

                isLogged(true)
                history.push('/dashboard')
                
                clearErrors()
            }
        })
        .catch(error => {
            setError(error)
            setShowError(true)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isValid()) {
            const user = {
            username: username, 
            password: password, 
            role_id: role, 
            company: company
            }

            manageUser(user)
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
                    {RoleError && <FormErrorMessage message={'Role must be selected'}/>}
                </div>

                <div className="form-group">
                    <label htmlFor="company">
                        Company:
                    </label>
                    <input type="text" name="company" id="company" placeholder="Acme Inc" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                    {CompanyError && <FormErrorMessage message={'invalid company name'}/>}
                </div>

                <div className="form-group">
                    <input className="submit" type="submit" value="Sign Up" />
                </div>

                <div className="form-group">
                    <NavLink to="/signin" >Sign In</NavLink>
                </div>

                { showError && <ErrorMessage message={this.error} /> }
            </form>
        </section>
    )
}

export default SignUp