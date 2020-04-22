import React, {useState} from 'react'
import './style/dashboard.css'
import TimeFrame from './Timeframes/TimeFrame'
import PtoSummary from './Pto/PtoSummary'
import Pto from './Pto/Pto'
import { NavLink } from 'react-router-dom'
import { Months } from './helpers/Enums'

/**
 * Dashboard component
 * @param {object} props 
 */
function Dashboard(props) {

    //variable declarations
    const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1)
    
    /**
     * Filters all timeframes and returns ONLY the timeframes for the month defined in expectedMonth.
     * @param {array} timeframes 
     * @param {number} expectedMonth 
     */
    const filterTimeFramesByMonth = (timeframes, expectedMonth) => {
        return timeframes.filter(timeframe => new Date(timeframe.date + ' ' + timeframe.starttime).getMonth() + 1 === expectedMonth)
    }

    /**
     * Returns the month name for the month number passed in monthNumber
     * @param {string} monthNumber 
     */
    const getMonthName = (monthNumber) => {
        return Months[monthNumber - 1]
    }

    /**
     * event handler to set the actualMonth state on button click (onClick)
     * Defines the new month t filter the timeframes fo rthat month
     * Called from NavLink 'month' arrows
     * @param {string} number 
     */
    const handleMonth = (number) => {
        const month = actualMonth + (number)
        setActualMonth(month)
    }

    const { hourLogs, ptoRequests, ptoSummary, handleDeleteHours, handleDeletePto } = props

    //gets the month name for the actualMonth number
    const monthName = getMonthName(actualMonth)

    /**
     * loads 'times' var ONLY with the timeframes for actualMonth:
     *  - the first time loads timeframes for the present month
     *  - everytime the NavLink 'month' arrows are clicked it reloads times with a list of the timeframes for the selected month
     */
    const times = filterTimeFramesByMonth(hourLogs, actualMonth)
    

    //generates a list of TimeFrame components for render
    const timeframes = times.map( (timeframe) => <TimeFrame key={timeframe.id} 
                                                                timeframe={timeframe} 
                                                                handleDeleteHours={handleDeleteHours} />)
    
    //generates a list of Pto components for render
    const ptos = ptoRequests.map( (pto) => <Pto key={pto.id} pto={pto} handleDeletePto={handleDeletePto} />)
    

    return (        
        <div className="dashboard-container">
            <header className="main-header">
                <h1>Dashboard:</h1>
            </header>

            <section className="time-container">
                <div className="time-title">
                    <h3>Time:</h3>
                </div>

                <div className="month">
                    <div className="month-title">
                        <h4>
                            <NavLink className="navlinkArrow" to='/dashboard' onClick={() => handleMonth(-1)}>{'< '}</NavLink>
                            {monthName}, 2020 
                            <NavLink className="navlinkArrow" to='/dashboard' onClick={() => handleMonth(1)}>{' >'}</NavLink>
                        </h4>
                    </div>
                    {timeframes}
                    {timeframes.length === 0 && 
                                                <div className="timeframe">
                                                    <div className="item time">
                                                        {`No Hours Logged in ${monthName}`}
                                                    </div>
                                                </div>}
                </div>
            </section>

            <section className="ptomain-container">
                <div className="pto-title">
                    <h3>PTO:</h3>
                </div>
                <div className="pto-data">
                    <PtoSummary ptoSummary={ptoSummary} />
                </div>
                <div className="ptoRequests">
                    { ptos }
                    { ptos.length === 0 && <div className="pto">
                                             <div className="item date">
                                               {`No Ptos Logged yet`}
                                             </div>
                                           </div> }
                </div>
            </section>

        </div>
    )
}

export default Dashboard

