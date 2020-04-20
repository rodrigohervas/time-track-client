import React from 'react'

function DeleteButton(props) {
    
    const { id, value, elementToDelete, onClick } = props   
    

    const launchAction = () => {
        if( window.confirm(`Are you sure you want to delete the ${elementToDelete}?`) ) {
            onClick()
        }
    }

    return (
        <input type="button" id={id} value={value} onClick={() => launchAction()} />
    )
}

export default DeleteButton