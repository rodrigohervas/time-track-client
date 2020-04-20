import React from 'react'
import {useHistory} from 'react-router-dom'

function ConfirmButton(props) {
    
    const history = useHistory()
    const { btn_id, btn_value, id, destination } = props
    const path = `/${destination}/${id}`
    

    const launchAlert = () => {
        if( window.confirm('Are you sure?') ) {
            history.push({
                pathname: path, 
                hourId: id
            })
        }
    }

    return (
        <input type="button" id={btn_id} value={btn_value} onClick={() => launchAlert()} />
    )
}

export default ConfirmButton