import React, { useState } from 'react'
import './../style/loghours.css'
import { useHistory } from 'react-router-dom'
import { formatDate, formatTime } from './../helpers/helper'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import config from './../config'

/**
 * LogHours component
 * @param {object} props 
 */
function LogHours(props) {

    //variable declaration
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [comments, setComments] = useState('')

    const [DateError, setDateError] = useState(false)
    const [StartTimeError, setStartTimeError] = useState(false)
    const [FinishTimeError, setFinishTimeError] = useState(false)
    const [CommentsError, setCommentsError] = useState(false)
    
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)

    const history = useHistory()

    /**
     * event handler to set the date state on input change (onChange)
     * @param {string} date 
     */
    const updateDate = (date) => {
        setDate(date)
    }

    /**
     * event handler to set the starttime state on input change (onChange)
     * @param {string} starttime 
     */
    const updateStartTime = (starttime) => {
        setStartTime(formatTime(starttime))
    }

    /**
     * event handler to set the finishtime state on input change (onChange)
     * @param {string} finishtime 
     */
    const updateFinishTime = (finishtime) => {
        setFinishTime(formatTime(finishtime))
    }

    /**
     * event handler to set the comments state on input change (onChange)
     * @param {string} comments 
     */
    const updateComments = (comments) => {
        setComments(comments)
    }

    /**
     * event handler to set input error when exiting the input (onBlur)
     * @param {event} e 
     */
    const validateInput = (e) => {
        if(!date) {
            setDateError(true)
        }
        else {
            setDateError(false)
        }

        if(!startTime) {
            setStartTimeError(true)
        }
        else {
            setStartTimeError(false)
        }

        if(!finishTime) {
            setFinishTimeError(true)
        }
        else {
            setFinishTimeError(false)
        }

        if(!comments) {
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
    const isValid = () => {
        if(DateError || StartTimeError || FinishTimeError || CommentsError) {
            return false
        }

        return true
    }

    /**
     * function to clear all errors before redirecting in form submmit
     */
    const clearErrors = () => {
        setDateError(false)
        setStartTimeError(false)
        setFinishTimeError(false)
        setCommentsError(false)
    }

    /**
     * event handler to manage the form submit: 
     * 1. posts timeframe to API
     * 2. sets render prop handleLogHours(data) to update timeframe state in App.js
     * @param {event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault()

        if (isValid()) {
            const timeframe = {
                date: formatDate(date, false), 
                starttime: startTime, 
                finishtime: finishTime, 
                comments: comments, 
                user_id: localStorage.getItem('user_id')
            }
                    
            const url = config.REACT_APP_API_URL_TIMEFRAMES
            const options = {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify(timeframe)
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t log hours')
                    }
                    return res.json()
                })
                .then(data => {
                    props.handleLogHours(data)
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

    /**
     * event handler to set focus to input on load
     * @param {event} e 
     */
    const setFocus = (e) => {
        e.target.focus()
    }
    
    return (
        <div className="loghours-container">
            <header className="main-header">
                <h1>Log working hours:</h1>
            </header>
            
            <section>
                <form className="add-time" onSubmit={e => handleSubmit(e)} >
                    <div className="form-group">
                        <label htmlFor="date">
                            Date:
                        </label>
                        <input type="date" name="date" id="date" placeholder="mm/dd/yyy" 
                               onBlur={e => validateInput(e)}
                               onChange={ e => updateDate(e.target.value) } 
                               onLoad={(e) => setFocus(e)} 
                               required />
                        { DateError && <FormErrorMessage message={'Date is required'}/> }
                    </div>

                    <div className="time">
                        <div className="form-group">
                            <label htmlFor="startTime">
                                Start Time:
                            </label>
                            <input type="time" id="startTime" name="startTime" min="07:00" max="20:00" placeholder="--:-- --"  
                               onBlur={e => validateInput(e)}
                               onChange={ e => updateStartTime(e.target.value) } 
                               required />
                        { StartTimeError && <FormErrorMessage message={'The start time is required'}/> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="finishTime">
                                Finish Time:
                            </label>
                            <input type="time" id="finishTime" name="finishTime" min="07:00" max="20:00" placeholder="--:-- --" 
                               onBlur={e => validateInput(e)}
                               onChange={ e => updateFinishTime(e.target.value) } 
                               required />
                               {FinishTimeError && <FormErrorMessage message={'The finish time is required'}/>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">
                            Comments:
                        </label>
                        <textarea id="comments" name="comments" placeholder="Comments" 
                               onBlur={e => validateInput(e)} 
                               onChange={ e => updateComments(e.target.value) } 
                               required />
                               {CommentsError && <FormErrorMessage message={'Comments are required'}/>}
                    </div>

                    <div className="form-group">
                        <div className="buttons">
                            <input type="submit" value="Cancel" onClick={() => history.push('/dashboard')} />
                            <input type="submit" value="Log" />
                        </div>
                    </div>

                    { showError && <ErrorMessage message={error} /> }

                </form>
            </section>
        </div>
    )
}

export default LogHours