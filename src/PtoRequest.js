import React from 'react'
import './ptorequest.css'
import Pto from './Pto'

function PtoRequest() {
    
    const daysData = {availableDays: 9, usedDays: 10, totalDays: 19}

    return (
        <div className="ptorequest-container">
            <header>
                <h1>Request PTO:</h1>
            </header>
            
            <section>
                <div className="pto-container">
                    <div className="left">
                        <Pto days={daysData}/>
                    </div>
                    
                    <div className="right">
                        <form className="request-pto">
                            <div className="form-group">
                                <label htmlFor="reason">
                                    Reason:
                                </label>
                                <select id="reason" name="reason">
                                    <option value="1">Select PTO type</option>
                                    <option value="2">Vacation days</option>
                                    <option value="3">Personal days</option>
                                    <option value="4">Sick days</option>
                                    <option value="5">Other</option>
                                </select>
                            </div>
                            <div className="days">
                                <div className="form-group">
                                    <label htmlFor="start-date">
                                        Start Date:
                                    </label>
                                    <input type="date" name="start-date" id="start-date" placeholder="mm/dd/yyy" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="finish-date">
                                        Finish Date:
                                    </label>
                                    <input type="date" name="finish-date" id="finish-date" placeholder="mm/dd/yyy" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comments">Comments:</label>
                                <textarea id="comments" name="comments" placeholder="Comments" required ></textarea>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Request" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PtoRequest