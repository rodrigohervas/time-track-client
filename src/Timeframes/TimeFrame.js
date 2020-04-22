import React, {useState} from 'react'
import './../style/timeframe.css'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import { formatDate, getHours } from './../helpers/helper'
import config from'./../config'

/**
 * Timeframe component
 * @param {object} props 
 */
function TimeFrame(props) {

    //Variable declarations
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)

    const history = useHistory();

    /**
     * update timeframe event handler to handle the update button click:
     * it redirects to UpdateHours component, passing the timeframe id (hourId)
     * @param {number} id 
     */
    const handleUpdate = (id) => {
        history.push({
            pathname: `/updateHours/${id}`, 
            hourId: id
        })
    }

    /**
     * delete event hanlder to handle the delete button click:
     *  1. deletes in timeframe API
     *  2. sets the handleDeleteHours(id) render prop to update timeframe state in App.js
     * @param {number} id 
     */
    const handleDelete = (id) => {
        const url = `${config.REACT_APP_API_URL_TIMEFRAMES}/${id}`
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
                    throw Error('Oops! something went wrong: couldn\'t delete hours')
                }
                return res.json()
            })
            .then(data => {
                //manage App state
                props.handleDeleteHours(id)
            })
            .catch(error => {
                setError(error)
                setShowError(true)
            })
    }

    const {id, date, starttime, finishtime} = props.timeframe
    
    //get the number of hours between starttime and finishtime
    const hours = getHours(date, starttime, finishtime)
    
    return (
        <div className="timeframe">
            <div className="item date">
                {formatDate(date, false)}
            </div>
            <div className="item time">
               {starttime}
            </div>
            <div className="item time">
                {finishtime}
            </div>
            <div className="item time">
                {hours}
            </div>
            <div className="button-item">
                <input type="button" id="edit" value="Edit" onClick={() => handleUpdate(id)} />
            </div>
            <div className="button-item">
                <input type="button" id="delete" value="Delete" onClick={() => handleDelete(id)} />                
            </div>

            { showError && <alert><ErrorMessage message={error} /></alert> }
            
        </div>
    )
}

export default TimeFrame