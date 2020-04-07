import React from 'react'
import './../style/errorMessage.css'

function ErrorMessage(props) {
    const { message } = props
    
    const errorMessage = message ? <div className="error"> {message} </div> : <></>

    return (
        errorMessage
    )
}

export default ErrorMessage