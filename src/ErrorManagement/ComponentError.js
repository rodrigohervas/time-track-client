import React, { Component } from 'react'

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
                <h2 className="errorMessage"> Could not display this component </h2>
            )
        }

        return this.props.children
    }
}

export default ComponentError