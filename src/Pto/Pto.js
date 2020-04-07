import React from 'react'
import './../style/pto.css'
import { useHistory } from 'react-router-dom'
import { ptoTypes } from './../helpers/Enums'
import {getDays} from './../helpers/helper'

function Pto(props) {

    const history = useHistory()

    const handleUpdate = (id) => {
        history.push({
            pathname: `/updatePto/${id}`, 
            ptoId: id
        })
    }

    const handleDelete = (id) => {
        //TODO: delete at DB
        
        props.handleDeletePto(id)
    }
    
    const {reason, startDate, finishDate, comments} = props.pto
    const days = getDays(startDate, finishDate)
    const reasonText = ptoTypes[parseInt(reason) - 1]

    return (
        <div className="pto">
            <div className="item reason">
                {reasonText}
            </div>
            <div className="item date">
                {startDate}
            </div>
            <div className="item date">
                {finishDate}
            </div>
            <div className="item date">
                {days}
            </div>
            <div className="button-item">
                <input type="button" id="edit" value="Edit" onClick={() => handleUpdate(props.pto.id)} />
            </div>
            <div className="button-item">
                <input type="button" id="delete" value="Delete" onClick={() => handleDelete(props.pto.id)} />
            </div>
        </div>
    )
}

export default Pto