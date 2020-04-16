import React from 'react'
import './../style/errorMessage.css'

function ErrorMessage(props) {
    const { message } = props.message
    
    const error =  message 
                        ? <div className="errorContainer"> 
                            <h3>{message}</h3>
                          </div>
                        : <></>
    
    return error
}

export default ErrorMessage