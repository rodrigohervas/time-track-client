import React from 'react'
import './timeframe.css'

function TimeFrame(props) {

    const {date, time} = props.timeframe

    return (
        <div className="timeframe">
            <div className="item date">
                {date}
            </div>
            <div className="item time">
                {time}
            </div>
            <div className="button-item">
                <input type="button" id="edit" value="Edit" />
            </div>
            <div className="button-item">
                <input type="button" id="delete" value="Delete" />
            </div>
        </div>
    )
}

export default TimeFrame