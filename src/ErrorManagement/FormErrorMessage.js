import React from 'react'
import './../style/formErrorMessage.css'

function FormErrorMessage(props) {
    const { message } = props
    
    const errorMessage = message ? <div className="error"> {message} </div> : <></>

    return (
        errorMessage
    )
}

export default FormErrorMessage