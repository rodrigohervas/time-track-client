import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './../style/componentError.css'

class ComponentError extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="errorCont">
                    <div className="errorBox">
                        <h2 className="errorMessage"> Oops, Something Went Wrong... </h2>
                        <h4 className="errorMessageLink">
                            <NavLink to="/dashboard">Go Back</NavLink>
                        </h4>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ComponentError