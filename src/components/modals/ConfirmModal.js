import React from 'react'
import '../../scss/modals/confirmModal.scss'

//FALTALOS ESTILOS DE TEXT

export const ConfirmModal = ({title, text, rightText, leftText, confirmAction, isActive, setIsActive}) => {

    
    const handleLeftButton = () => {
        setIsActive(false)
    }

    return (

        <div className={isActive? "animate__animated animate__fadeIn confirm-modal-container" : "confirm-modal-container"} style={isActive? {display:'flex'} : {display:'none'}}>
            <div className={isActive? "animate__animated animate__fadeIn confirm-modal" : "confirm-modal"} >
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
