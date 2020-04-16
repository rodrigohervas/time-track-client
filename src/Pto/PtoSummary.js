import React from 'react'
import './../style/ptoSummary.css'

function PtoSummary(props) {

    const {user_id, availabledays, useddays, totaldays} = props.ptoSummary

    return (
        <div className="ptoSummary">
            <div className="top">
                <label className="num-days">{availabledays}</label>
                <label className="type-days">Available days</label>
            </div>
            <div className="bottom">
                <label className="num-days">{useddays}</label>
                <label className="type-days">Used days</label>
                <label className="num-days">|</label>
                <label className="num-days">{totaldays}</label>
                <label className="type-days">Total days</label>
            </div>
        </div>
    )
}

export default PtoSummary