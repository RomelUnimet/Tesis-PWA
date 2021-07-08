import React from 'react'
import '../../scss/modals/confirmModal.scss'

//FALTALOS ESTILOS DE TEXT

export const ConfirmModal = ({title, text, rightText, leftText, confirmAction, isActive, setIsActive}) => {

    
    const handleLeftButton = () => {
        setIsActive(false)
    }

    return (

        <div className="confirm-modal-container" style={isActive? {display:'flex'} : {display:'none'}}>
            <div className="confirm-modal" style={isActive? {} : {}}>
                    <h1>{title}</h1>
                    <p>{text}</p>
                
                <div className="confirm-modal-buttons">
                    <button className="confirm-modal-left-button" onClick={handleLeftButton}> {leftText} </button>
                    <button className="confirm-modal-right-button" onClick={()=>{confirmAction()}}> {rightText} </button>
                </div>
            </div>
        </div>

    )
}
