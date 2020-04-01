import React from 'react'
import './dashboard.css'
import TimeFrame from './TimeFrame'
import Pto from './Pto'

function Dashboard(props) {

    const timeData = [
        {id: 1, date: 'Monday, 1 february, 2020', time: '8 hours'}, 
        {id: 2, date: 'Tuesday, 2 february, 2020', time: '8 hours'}, 
        {id: 3, date: 'Thursday, 8 february, 2020', time: '6 hours'}, 
        {id: 4, date: 'Firday, 9 february, 2020', time: '7 hours'}, 
        {id: 5, date: 'Monday, 22 february, 2020', time: '8 hours'}, 
    ]
    const daysData = {availableDays: 9, usedDays: 10, totalDays: 19}

    const timeframes = timeData.map( (timeframe) => <TimeFrame key={timeframe.id} timeframe={timeframe} />)
    const days = <Pto days={daysData} />

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
                    <div className="month-title"><h4>February, 2020</h4></div>
                    {timeframes}
                </div>
            </section>

            <section className="ptomain-container">
                <div className="pto-title">
                    <h3>PTO:</h3>
                </div>
                <div className="pto-data">
                    {days}
                </div>
            </section>

        </div>
    )
}

export default Dashboard