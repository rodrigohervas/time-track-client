import React from 'react'
import './../style/errorMessage.css'

function ErrorMessage(props) {
    const { message } = props.message || 'Something happened, try again later'

    const showError =  message 
                        ? <div className="errorContainer"> 
                            <h3>{ message }</h3>
                          </div>
                        : <></>
    
    return showError
}

export default ErrorMessage