import React from 'react'
import './landing.css'

function Landing(props) {
    
    return (
        <div className="landing">
            <header className="landing-header">
                <h1>Manage your employees time and attendance</h1>
                <h2>Time Track helps you to easily manage your team's working time and PTO</h2>
            </header>
            
            <section className="section">
                <h2>How it works:</h2>
            </section>

            <section className="section">
                <div classname="section-title">
                    <h3>Log Working Hours</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">[Page Holder to log hours]</div>
                    <div className="right-box">Time track lets you manage your working hours to keep them tracked in one easily accesible place.</div>
                </div>
            </section>

            <section className="section">
                <div classname="section-title">
                    <h3>Request PTO</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">Time track makes it easy to request your Paid-Time-Off days.</div>
                    <div className="right-box">[Page Holder to request PTO]</div>
                </div>
            </section>

            <section className="section">
                <div classname="section-title">
                    <h3>Information Dashboard</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">[Page holder for image of worker dashboard]</div>
                    <div className="right-box">Time track lets you easily access all your working time and PTO information in a comprehensive Dashboard.</div>
                </div>
            </section>

            <section className="section">
                <div classname="section-title">
                    <h3>Information is Protected</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">Time track protects access to your information.</div>
                    <div className="right-box">[Page Holder to Sign In / Sign Up form]</div>
                </div>
            </section>

        </div>
    )
}

export default Landing