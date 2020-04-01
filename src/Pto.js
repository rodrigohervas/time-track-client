import React from 'react'
import './pto.css'

function Pto(props) {

    const {availableDays, usedDays, totalDays} = props.days

    return (
        <div className="pto">
            <div className="top">
                <label className="num-days">{availableDays}</label>
                <label className="type-days">Available days</label>
            </div>
            <div className="bottom">
                <label className="num-days">{usedDays}</label>
                <label className="type-days">Used days</label>
                <label className="num-days">|</label>
                <label className="num-days">{totalDays}</label>
                <label className="type-days">Total days</label>
            </div>
        </div>
    )
}

export default Pto