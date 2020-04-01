import React from 'react'
import './loghours.css'

function LogHours() {
    
    return (
        <div className="loghours-container">
            <header>
                <h1>Log working hours:</h1>
            </header>
            
            <section>
                <form className="add-time">
                    <div className="form-group">
                        <label htmlFor="date">
                            Date:
                        </label>
                        <input type="date" name="date" id="date" placeholder="mm/dd/yyy" required />
                    </div>

                    <div className="time">
                        <div className="form-group">
                            <label htmlFor="startTime">
                                Start Time:
                            </label>
                            <input type="time" id="startTime" name="startTime" min="07:00" max="20:00" placeholder="--:-- --" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="finishTime">
                                Finish Time:
                            </label>
                            <input type="time" id="finishTime" name="finishTime" min="07:00" max="20:00" placeholder="--:-- --" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">
                            Comments:
                        </label>
                        <textarea id="comments" name="comments" placeholder="Comments" />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Log" />
                    </div>
                </form>
            </section>
        </div>
    )
}

export default LogHours