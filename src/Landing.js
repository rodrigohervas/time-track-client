import React from 'react'
import './style/landing.css'
import logHoursImg from './img/log-hours-page-md.png'
import requestPtoImg from './img/request-pto-page-md.png'
import dashboardImg from './img/dashboard-page-md.png'
import signinImg from './img/signin-page-md.png'


function Landing(props) {
    
    return (
        <div className="landing">
            <header className="landing-header">
                <h1>Manage your employees time and attendance</h1>
                <h2>Time Track helps you to easily manage your team's working time and PTO</h2>
            </header>
            
            <section className="section landing-how-it-works">
                <h2>How it works:</h2>
            </section>

            <section className="section landing-log-working-hours">
                <div className="section-title">
                    <h3>Log Working Hours</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">
                        <img className="responsive-image" src={logHoursImg} alt="Log hours screenshot" />
                    </div>
                    <div className="right-box"><p className="section-text">Time track lets you manage your working hours to keep them tracked in one easily accesible place.</p></div>
                </div>
            </section>

            <section className="section landing-request-pto">
                <div className="section-title">
                    <h3>Request PTO</h3>
                </div>
                <div className="section-content">
                    <div className="left-box"><p className="section-text">Time track makes it easy to request your Paid-Time-Off days.</p></div>
                    <div className="right-box">
                        <img className="responsive-image" src={requestPtoImg} alt="Request PTO screenshot" />
                    </div>
                </div>
            </section>

            <section className="section landing-information-dashboard">
                <div className="section-title">
                    <h3>Information Dashboard</h3>
                </div>
                <div className="section-content">
                    <div className="left-box">
                        <img className="responsive-image" src={dashboardImg} alt="Dashboard screenshot" />
                    </div>
                    <div className="right-box"><p className="section-text">Time track lets you easily access all your working time and PTO information in a comprehensive Dashboard.</p></div>
                </div>
            </section>

            <section className="section landing-information-protected">
                <div className="section-title">
                    <h3 id="info-land">Information is Protected</h3>
                </div>
                <div className="section-content">
                    <div className="left-box"><p className="section-text">Time track protects access to your information.</p></div>
                    <div className="right-box">
                        <img className="responsive-image" src={signinImg} alt="Sign-in screenshot" />
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Landing