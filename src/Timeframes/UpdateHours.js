import React, { useState, useEffect } from 'react'
import './../style/loghours.css'
import { useHistory } from 'react-router-dom'
import { formatDate, formatTime } from './../helpers/helper'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import config from './../config'


function UpdateHours(props) {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [comments, setComments] = useState('')
    const [DateError, setDateError] = useState(false)
    const [StartTimeError, setStartTimeError] = useState(false)
    const [FinishTimeError, setFinishTimeError] = useState(false)
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const history = useHistory()

       
    useEffect( () => {
        setDate(formatDate(hourLog.date, true))
        setStartTime(hourLog.starttime)
        setFinishTime(hourLog.finishtime)
        setComments(hourLog.comments)
    }, [])
    
    const updateDate = (date) => {
        setDate(date)
    }

    const updateStartTime = (time) => {
        setStartTime(formatTime(time))
    }

    const updateFinishTime = (time) => {
        setFinishTime(formatTime(time))
    }

    const updateComments = (comments) => {
        setComments(comments)
    }

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
    }

    const isValid = () => {
        if(DateError || StartTimeError || FinishTimeError) {
            return false
        }

        return true
    }

    const clearErrors = () => {
        setDateError(false)
        setStartTimeError(false)
        setFinishTimeError(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isValid()) {
            const timeframe = {
                id: hourLog.id, 
                date: formatDate(date, false), 
                starttime: startTime, 
                finishtime: finishTime, 
                comments: comments, 
                user_id: hourLog.user_id
            }

            const url = `${config.REACT_APP_API_URL_TIMEFRAMES}/${timeframe.id}`
            const options = {
                method: 'PUT', 
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify(timeframe)
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t update hours')
                    }
                    return res.json()
                })
                .then( data => {
                    handleHourUpdate(timeframe)
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

    const { hourLog, handleHourUpdate } = props
    
    return (
        <div className="loghours-container">
            <header className="main-header">
                <h1>Update working hours:</h1>
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
                               value={date}
                               required />
                        {DateError && <FormErrorMessage message={'Date is required'}/>}
                    </div>

                    <div className="time">
                        <div className="form-group">
                            <label htmlFor="startTime">
                                Start Time:
                            </label>
                            <input type="time" id="startTime" name="startTime" min="07:00" max="20:00" placeholder="--:-- --"  
                               onBlur={e => validateInput(e)}
                               onChange={ e => updateStartTime(e.target.value) } 
                               value={startTime} 
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
                               value={finishTime} 
                               required />
                            { FinishTimeError && <FormErrorMessage message={'The finish time is required'}/> }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">
                            Comments:
                        </label>
                        <textarea id="comments" name="comments" placeholder="Comments" 
                               onChange={ e => updateComments(e.target.value) } 
                               value={comments} required></textarea>
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

export default UpdateHours