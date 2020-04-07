import React, { useState, useEffect } from 'react'
import './../style/loghours.css'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './../ErrorManagement/ErrorMessage'


function UpdateHours(props) {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [comments, setComments] = useState('')
    const [DateError, setDateError] = useState(false)
    const [StartTimeError, setStartTimeError] = useState(false)
    const [FinishTimeError, setFinishTimeError] = useState(false)
    const history = useHistory()

    useEffect( () => {
        setDate(hourLog.date)
        setStartTime(hourLog.startTime)
        setFinishTime(hourLog.finishTime)
        setComments(hourLog.comments)
    }, [])
    
    const updateDate = (date) => {
        setDate(date)
    }

    const updateStartTime = (time) => {
        setStartTime(time)
    }

    const updateFinishTime = (time) => {
        setFinishTime(time)
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
            const log = {
                id: hourLog.id, 
                date: date, 
                startTime: startTime, 
                finishTime: finishTime, 
                comments: comments
            }
            
            //TODO: Update hours Logs in DB

            handleHourUpdate(log)
            history.push('/dashboard')

            //clear errors
            clearErrors()
        }
    }

    const { hourLog, handleHourUpdate } = props
    
    return (
        <div className="loghours-container">
            <header>
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
                               value={date}
                               required />
                        {DateError && <ErrorMessage message={'Date is required'}/>}
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
                            { StartTimeError && <ErrorMessage message={'The start time is required'}/> }
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
                            { FinishTimeError && <ErrorMessage message={'The finish time is required'}/> }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">
                            Comments:
                        </label>
                        <textarea id="comments" name="comments" placeholder="Comments" 
                               onChange={ e => updateComments(e.target.value) } 
                               value={comments} ></textarea>
                    </div>

                    <div className="form-group">
                        <div className="buttons">
                            <input type="submit" value="Cancel" onClick={() => history.push('/dashboard')} />
                            <input type="submit" value="Log" />
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UpdateHours