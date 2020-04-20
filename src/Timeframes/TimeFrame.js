import React, {useState} from 'react'
import './../style/timeframe.css'
import { useHistory } from 'react-router-dom'
import ErrorMessage from './../ErrorManagement/ErrorMessage'
import { formatDate } from './../helpers/helper'
import config from'./../config'

function TimeFrame(props) {

    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)

    const history = useHistory();

    const getHours = (date, startTime, finishTime) => {
        const startDate = new Date(date + ' ' + startTime)
        const startMinutes  = (startDate.getHours() * 60)  + startDate.getMinutes()
        const finishDate = new Date(date + ' ' + finishTime)
        const finishMinutes  = (finishDate.getHours() * 60) + finishDate.getMinutes()
        const hours = (finishMinutes - startMinutes) / 60
        return hours.toFixed(2) 
    }

    const handleUpdate = (id) => {
        history.push({
            pathname: `/updateHours/${id}`, 
            hourId: id
        })
    }

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