import React from 'react'
import '../../scss/modals/confirmModal.scss'
import { motion } from 'framer-motion'

export const ConfirmModal = ({title, text, rightText, leftText, confirmAction, setIsActive}) => {

    
    const handleLeftButton = () => {
        setIsActive(false)
    }
    return (
      
        <motion.div 
            className="confirm-modal-container" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0 }}
            transition={{duration:0.3}}
        >
            <div className="confirm-modal">
                    <h1>{title}</h1>
                    <p>{text}</p>
                <div className="confirm-modal-buttons">
                    <button className="confirm-modal-left-button" onClick={handleLeftButton}> {leftText} </button>
                    <button className="confirm-modal-right-button" onClick={()=>{confirmAction()}}> {rightText} </button>
                </div>
            </div>
        </motion.div>
                    
    )
}
