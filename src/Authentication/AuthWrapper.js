import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

function AuthWrapper(props) {

    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const history = useHistory()

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