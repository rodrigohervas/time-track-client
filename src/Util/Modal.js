import React from 'react'
import ConfirmButton from './ConfirmButton'

function Modal(props) {

    const { btn_id, btn_value, id, destination } = props
    const message = 'Test modal text goes here'

    return(
        <div className="modal">
            {message}
            <ConfirmButton btn_id={btn_id} btn_value={btn_value} id={id} destination={destination} />
        </div>
    )
}

export default Modal