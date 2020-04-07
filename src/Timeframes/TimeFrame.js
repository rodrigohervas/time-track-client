import React from 'react'
import './../style/timeframe.css'
import { useHistory } from 'react-router-dom'

function TimeFrame(props) {

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
        //TODO: delete at DB
        
        props.handleDeleteHours(id)
    }


    //const {date, startTime, finishTime, month, year, comments} = props.timeframe
    const {date, startTime, finishTime} = props.timeframe
    const hours = getHours(date, startTime, finishTime)
    
    return (
        <div className="timeframe">
            <div className="item date">
                {date}
            </div>
            <div className="item time">
                {startTime}
            </div>
            <div className="item time">
                {finishTime}
            </div>
            <div className="item time">
                {hours}
            </div>
            <div className="button-item">
                <input type="button" id="edit" value="Edit" onClick={() => handleUpdate(props.timeframe.id)} />
            </div>
            <div className="button-item">
                <input type="button" id="delete" value="Delete" onClick={() => handleDelete(props.timeframe.id)} />
            </div>
        </div>
    )
}

export default TimeFrame