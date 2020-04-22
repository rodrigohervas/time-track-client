import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

/**
 * Authorization Component to validate if user is signed-in
 * @param {object} props 
 */
function AuthWrapper(props) {

    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const history = useHistory()

    /**
     * useEffect hook that validates is there user is signed-in, 
     * then redirects to the children component (defined in App.js) or to SignIn component
     */
    useEffect(() => {
        if (username === '' || password === '') {
            console.log('User not signed in, redirecting to signin')
            history.push('/signin')
        }
    }, [])

    return(
        <div>
            {props.children}
        </div>
    )

}

export default AuthWrapper