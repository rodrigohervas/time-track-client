import React, { useState, useEffect } from 'react'
import './../style/ptorequest.css'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './../ErrorManagement/ErrorMessage'

function UpdatePto(props) {

    const [reason, setReason] = useState('')
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [comments, setComments] = useState('')
    const [ReasonError, setReasonError] = useState(false)
    const [StartDateError, setStartDateError] = useState(false)
    const [FinishDateError, setFinishDateError] = useState(false)
    const history = useHistory()

    useEffect(() =>{
        setReason(pto.reason)
        setStartDate(pto.startDate)
        setFinishDate(pto.finishDate)
        setComments(pto.comments)
    }, [])

    const updateReason = (reason) => {
        setReason(reason)
    }

    const updateStartDate = (startDate) => {
        setStartDate(startDate)
    }

    const updateFinishDate = (finishDate) => {
        setFinishDate(finishDate)
    }

    const updateComments = (comments) => {
        setComments(comments)
    }

    const validateInput = (e) => {
        if (!reason) {
            setReasonError(true)
        }
        else { 
            setReasonError(false)
        }

        if (!startDate) {
            setStartDateError(true)
        }
        else { 
            setStartDateError(false)
        }

        if (!finishDate) {
            setFinishDateError(true)
        }
        else { 
            setFinishDateError(false)
        }
    }    

    const isValid = ()  => {
        if(ReasonError || StartDateError || FinishDateError) {
            return false
        }

        return true
    }

    const clearErrors = () => {
        setReasonError(false)
        setStartDateError(false)
        setFinishDateError(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isValid()) {
            const pto = {
                id: props.pto.id, 
                reason: reason, 
                startDate: startDate, 
                finishDate: finishDate, 
                comments: comments
            }

            //TODO: update pto in DB

            props.handlePtoUpdate(pto)

            history.push('/dashboard')

            //clear Errors
            clearErrors()
        }
    }

    const { pto } = props
    
    return (
        <div className="ptorequest-container">
            <header>
                <h1>Request PTO:</h1>
            </header>
            
            <section>
                <div className="pto-container">
                    <form className="request-pto" onSubmit={ e => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="reason">
                                Reason:
                            </label>
                            <select id="reason" name="reason"
                                    onBlur={e => validateInput(e)}
                                    onChange={ e => updateReason(e.target.value)} 
                                    value={reason} >
                                <option value="0">Select PTO type</option>
                                <option value="1">Vacation days</option>
                                <option value="2">Personal days</option>
                                <option value="3">Sick days</option>
                                <option value="4">Other</option>
                            </select>
                            { ReasonError && <ErrorMessage message={'The PTO reason is mandatory'} /> }
                        </div>
                        <div className="days">
                            <div className="form-group">
                                <label htmlFor="start-date">
                                    Start Date:
                                </label>
                                <input type="date" name="start-date" id="start-date" placeholder="mm/dd/yyy" 
                                        onBlur={e => validateInput(e)}
                                        onChange={ e => updateStartDate(e.target.value)} 
                                        value={startDate}  
                                        required />
                                { StartDateError && <ErrorMessage message={'The Start Date is mandatory'} /> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="finish-date">
                                    Finish Date:
                                </label>
                                <input type="date" name="finish-date" id="finish-date" placeholder="mm/dd/yyy" 
                                        onBlur={e => validateInput(e)}
                                        onChange={ e => updateFinishDate(e.target.value)} 
                                        value={finishDate} 
                                        required />
                                { FinishDateError && <ErrorMessage message={'The Finish Date is mandatory'} /> }
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comments:</label>
                            <textarea id="comments" name="comments" placeholder="Comments" 
                                        value={comments} 
                                        onChange={ e => updateComments(e.target.value)} ></textarea>
                        </div>
                        <div className="form-group">
                            <div className="buttons">
                                <input type="submit" value="Cancel" onClick={() => history.push('/dashboard')} />
                                <input type="submit" value="Update" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default UpdatePto