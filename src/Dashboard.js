import React, {useState} from 'react'
import './style/dashboard.css'
import TimeFrame from './Timeframes/TimeFrame'
import PtoSummary from './Pto/PtoSummary'
import Pto from './Pto/Pto'
import { NavLink } from 'react-router-dom'
import { Months } from './helpers/Enums'

function Dashboard(props) {

    const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1)
    
    const filterTimeFramesByMonth = (timeframes, expectedMonth) => {
        return timeframes.filter(timeframe => new Date(timeframe.date + ' ' + timeframe.startTime).getMonth() + 1 === expectedMonth)
    }

    const getMonthName = (monthNumber) => {
        return Months[monthNumber - 1]
    }

    const handleMonth = (number) => {
        const month = actualMonth + (number)
        setActualMonth(month)
    }

    const { hourLogs, ptoRequests, ptoSummary, handleDeleteHours, handleDeletePto } = props
    
    const monthName = getMonthName(actualMonth)

    const times = filterTimeFramesByMonth(hourLogs, actualMonth)
    const timeframes = times.map( (timeframe) => <TimeFrame key={timeframe.id} 
                                                                timeframe={timeframe} 
                                                                handleDeleteHours={handleDeleteHours} />)
        
    const ptos = ptoRequests.map( (pto) => <Pto key={pto.id} pto={pto} handleDeletePto={handleDeletePto} />)
    
    return (        
        <div className="dashboard-container">
            <header>
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
                    <PtoSummary days={ptoSummary} />
                </div>
                <div className="ptoRequests">
                    {ptos}
                </div>
            </section>

        </div>
    )
}

export default Dashboard

