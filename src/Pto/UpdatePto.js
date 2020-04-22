import React, { useState, useEffect } from 'react'
import './../style/ptorequest.css'
import { useHistory } from 'react-router-dom'
import FormErrorMessage from './../ErrorManagement/FormErrorMessage'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import config from './../config'
import { formatDate } from './../helpers/helper'

function UpdatePto(props) {

    const [ptoId, setPtoId] = useState('')
    const [type, setType] = useState('')
    const [startdate, setStartDate] = useState('')
    const [finishdate, setFinishDate] = useState('')
    const [comments, setComments] = useState('')

    const [typeError, setTypeError] = useState(false)
    const [StartDateError, setStartDateError] = useState(false)
    const [FinishDateError, setFinishDateError] = useState(false)
    
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)

    const history = useHistory()

    useEffect(() =>{
        if(props.pto) {
            localStorage.setItem('ptoId', props.pto.id)
            localStorage.setItem('type', props.pto.type)
            localStorage.setItem('startdate', props.pto.startdate)
            localStorage.setItem('finishdate', props.pto.finishdate)
            localStorage.setItem('comments', props.pto.comments)
        }

        setPtoId(localStorage.getItem('ptoId'))
        setType(localStorage.getItem('type'))
        setStartDate(localStorage.getItem('startdate'))
        setFinishDate(localStorage.getItem('finishdate'))
        setComments(localStorage.getItem('comments'))
    }, [])

    const clearLocalState = () => {
        localStorage.removeItem('ptoId')
        localStorage.removeItem('type')
        localStorage.removeItem('startdate')
        localStorage.removeItem('finishdate')
        localStorage.removeItem('comments')
    }

    const updateType = (type) => {
        setType(type)
    }

    const updateStartDate = (startdate) => {
        setStartDate(startdate)
    }

    const updateFinishDate = (finishdate) => {
        setFinishDate(finishdate)
    }

    const updateComments = (comments) => {
        setComments(comments)
    }

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
    }    

    const isValid = ()  => {
        if(typeError || StartDateError || FinishDateError) {
            return false
        }

        return true
    }

    const clearErrors = () => {
        setTypeError(false)
        setStartDateError(false)
        setFinishDateError(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isValid()) {
            const pto = {
                id: parseInt(ptoId), 
                user_id: parseInt(localStorage.getItem('user_id')), 
                type: type, 
                startdate: formatDate(startdate, false), 
                finishdate: formatDate(finishdate, false), 
                comments: comments
            }

            const url = `${config.REACT_APP_API_URL_PTOS}/${pto.id}`
            const options = {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify(pto)
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t update pto')
                    }
                    return res.json()
                })
                .then(data => {
                    props.handlePtoUpdate(pto)
                    clearLocalState()
                    history.push('/dashboard')
                    clearErrors()
                })
                .catch(error => {
                    setError(error)
                    setShowError(true)
                })
            }
    }

    const handleCancel = () => {
        clearLocalState()
        history.push('/dashboard')
    }

    //const { pto } = props
        
    return (
        <div className="ptorequest-container">
            <header className="main-header">
                <h1>Update Request PTO:</h1>
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
                                    onChange={ e => updateType(e.target.value)} 
                                    value={type} >
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
                                        value={formatDate(startdate, true)}  
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
                                        value={formatDate(finishdate, true)} 
                                        required />
                                { FinishDateError && <FormErrorMessage message={'The Finish Date is mandatory'} /> }
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comments:</label>
                            <textarea id="comments" name="comments" placeholder="Comments" 
                                        value={comments} 
                                        onChange={ e => updateComments(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                            <div className="buttons">
                                <input type="submit" value="Cancel" onClick={() => handleCancel()} />
                                <input type="submit" value="Update" />
                            </div>
                        </div>

                        { showError && <ErrorMessage message={error} /> }

                    </form>
                </div>
            </section>
        </div>
    )
}

export default UpdatePto