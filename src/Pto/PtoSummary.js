import React from 'react'
import './../style/ptoSummary.css'

function PtoSummary(props) {

    const {availabledays, useddays, totaldays} = props.ptoSummary

    return (
        <div className="ptoSummary">
            <div className="top">
                <label className="num-days">{availabledays}</label>
                <label className="type-days">Available days</label>
            </div>
            <div className="bottom">
                <div className="bottom-right onleft">
                    <label className="num-days">{useddays}</label>
                    <label className="type-days">Used days</label>
                </div>
                {/* <div className="num-days-separator">|</div> */}
                <div className="bottom-right onright">               
                    <label className="num-days">{totaldays}</label>
                    <label className="type-days">Total days</label>
                </div>
            </div>
        </div>
    )
}

export default PtoSummary