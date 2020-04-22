import React, { useState } from 'react'
import './../style/ptorequest.css'
import PtoSummary from './PtoSummary'
import { useHistory } from 'react-router-dom'
import { formatDate } from './../helpers/helper'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import config from './../config'

/**
 * PtoRequest Component
 * @param {object} props 
 */
function PtoRequest(props) {
    
    //variable declarations
    const [type, setType] = useState('')
    const [startdate, setStartDate] = useState('')
    const [finishdate, setFinishDate] = useState('')
    const [comments, setComments] = useState('')

    const [typeError, setTypeError] = useState(false)
    const [StartDateError, setStartDateError] = useState(false)
    const [FinishDateError, setFinishDateError] = useState(false)
    const [CommentsError, setCommentsError] = useState(false)
    
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    
    const history = useHistory()
    
    /**
     * event handler to set the type state on input change
     * @param {string} type 
     */
    const updateType = (type) => {
        setType(type)
    }

    /**
     * event handler to set the startdate state on input change
     * @param {string} startdate 
     */
    const updateStartDate = (startdate) => {
        setStartDate(startdate)
    }

    /**
     * event handler to set the finishdate state on input change
     * @param {string} finishdate 
     */
    const updateFinishDate = (finishdate) => {
        setFinishDate(finishdate)
    }

    /**
     * event handler to set the comments state on input change (onChange)
     * @param {string} comments 
     */
    const updateComments = (comments) => {
        setComments(comments)
    }

    /**
     * event handler to set input error when exting the input (onBlur)
     * @param {event} e 
     */
    const validateInput = (e) => {
        if (!type) {
            setTypeError(true)
        }
        else { 
            setTypeError(false)
        }

        if (!startdate) {
            setStartDateError(true)
        }
        else { 
            setStartDateError(false)
        }

        if (!finishdate) {
            setFinishDateError(true)
        }
        else { 
            setFinishDateError(false)
        }

        if (!comments) {
            setCommentsError(true)
        }
        else { 
            setCommentsError(false)
        }
    }

    /**
     * validator the returns if there's any error for any field in the form
     * called from form submit handler
     */
    const isValid = ()  => {
        if(typeError || StartDateError || FinishDateError || CommentsError) {
            return false
        }

        return true
    }

    /**
     * function to clear all errors before redirecting in form submmit
     */
    const clearErrors = () => {
        setTypeError(false)
        setStartDateError(false)
        setFinishDateError(false)
        setCommentsError(false)
    }

    /**
     * event handler to manage the form submit: 
     * 1. posts pto to API
     * 2. sets render prop handleRequestPto(data) to update pto state in App.js
     * @param {event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isValid()) {
            const pto = {
                user_id: localStorage.getItem('user_id'), 
                type: type, 
                startdate: formatDate(startdate, false), 
                finishdate: formatDate(finishdate, false), 
                comments: comments
            }

            const url = config.REACT_APP_API_URL_PTOS
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify(pto)
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t create pto')
                    }
                    return res.json()
                })
                .then(data => {
                    props.handleRequestPto(data)
                    
                    history.push('/dashboard')
                    
                    //clear errors
                    clearErrors()
                })
                .catch(error => {
                    setError(error)
                    setShowError(true)
                })
        }
    }


    const ptoSummary = <PtoSummary ptoSummary={props.ptoSummary} />

    return (
        <div className="ptorequest-container">
            <header className="main-header">
                <h1>Request PTO:</h1>
            </header>
            
            <section>
                <div className="pto-container">
                    <div className="left">
                        {ptoSummary}
                    </div>
                    
                    <div className="right">
                        <form className="request-pto" onSubmit={ e => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="reason">
                                    Reason:
                                </label>
                                <select id="reason" name="reason" 
                                        onBlur={e => validateInput(e)}
                                        onChange={ e => updateType(e.target.value)}>
                                    <option value="0">Select PTO type</option>
                                    <option value="1">Vacation days</option>
                                    <option value="2">Personal days</option>
                                    <option value="3">Sick days</option>
                                    <option value="4">Other</option>
                                </select>
                            { typeError && <FormErrorMessage message={'The PTO reason is mandatory'} /> }
                            </div>
                            <div className="days">
                                <div className="form-group">
                                    <label htmlFor="start-date">
                                        Start Date:
                                    </label>
                                    <input type="date" name="start-date" id="start-date" placeholder="mm/dd/yyy" 
                                            onBlur={e => validateInput(e)}
                                            onChange={ e => updateStartDate(e.target.value)} 
                                            required />
                                    { StartDateError && <FormErrorMessage message={'The Start Date is mandatory'} /> }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="finish-date">
                                        Finish Date:
                                    </label>
                                    <input type="date" name="finish-date" id="finish-date" placeholder="mm/dd/yyy" 
                                            onBlur={e => validateInput(e)}
                                            onChange={ e => updateFinishDate(e.target.value)} 
                                            required />
                                    { FinishDateError && <FormErrorMessage message={'The Finish Date is mandatory'} /> }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comments">Comments:</label>
                                <textarea id="comments" name="comments" placeholder="Comments" 
                                          onBlur={e => validateInput(e)} 
                                          onChange={ e => updateComments(e.target.value)} 
                                          required></textarea>
                                { CommentsError && <FormErrorMessage message={'Comments are mandatory'} />}
                            </div>
                            <div className="form-group">
                                <div className="buttons">
                                    <input type="submit" value="Cancel" onClick={() => history.push('/dashboard')} />
                                    <input type="submit" value="Request" />
                                </div>
                            </div>

                            { showError && <ErrorMessage message={error} />}

                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PtoRequest