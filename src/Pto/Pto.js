import React, { useState } from 'react'
import './../style/pto.css'
import { useHistory } from 'react-router-dom'
import { ptoTypes } from './../helpers/Enums'
import { getDays, formatDate, formatDays } from './../helpers/helper'
import config from './../config'
import ErrorMessage from './../ErrorManagement/ErrorMessage'

/**
 * Pto Component
 * @param {object} props 
 */
function Pto(props) {

    //variable declarations
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    
    const history = useHistory()

    /**
     * update event handler to redirect to UpdatePto passing the ptoId and route
     * @param {number} id 
     */
    const handleUpdate = (id) => {
        history.push({
            pathname: `/updatePto/${id}`, 
            ptoId: id
        })
    }

    /**
     * delete event handler to delete a pto in the API, and then load the render prop handleDeletePto to update state in App.js
     * @param {number} id 
     */
    const handleDelete = (id) => {
        
        const url = `${config.REACT_APP_API_URL_PTOS}/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json', 
                'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
            },
        }

        fetch(url, options)
            .then(res => {
                if(!res.ok) {
                    throw Error('Oops! something went wrong: couldn\'t delete pto')
                }
                return res.json()
            })
            .then(data => {

                props.handleDeletePto(id)
            })
            .catch(error => {
                setError(error)
                setShowError(true)
            })
    }
    
    const {type, startdate, finishdate, comments} = props.pto
    
    //get the days bethween two dates
    const days = getDays(startdate, finishdate)

    //set the ptoType text for the type id
    const reasonText = ptoTypes[parseInt(type) - 1]

    return (
        <div className="pto">
            <div className="pto-data">
                <div className="item date">
                    {formatDate(startdate)}
                </div>
                <div className="item date">
                    {formatDate(finishdate)}
                </div>
                <div className="item date">
                    {formatDays(days)}
                </div>
                <div className="item reason">
                    {reasonText}
                </div>
            </div>
            <div className="pto-buttons">
                <div className="button-item">
                    <input type="button" id="edit" value="Edit" onClick={() => handleUpdate(props.pto.id)} />
                </div>
                <div className="button-item">
                    <input type="button" id="delete" value="Delete" onClick={() => handleDelete(props.pto.id)} />
                </div>
            </div>
            
            { showError && <ErrorMessage message={error} />}
            
        </div>
    )
}

export default Pto