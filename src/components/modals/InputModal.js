import React from 'react'
import '../../scss/modals/inputModal.scss'
import { motion } from 'framer-motion'

//FALTALOS ESTILOS DE TEXT

export const InputModal = ({title, text, rightText, leftText, confirmAction, isActive, setIsActive, inputValue, setInputValue}) => {

    const handleLeftButton = () => {
        setIsActive(false)
    }

    return (
       
        <motion.div 
            className="input-modal-container" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0 }}
            transition={{duration:0.3}}
        >
            <div className="input-modal">
                    <h1>{title}</h1>
                    <p>{text}</p>
                    <input 
                        className="input-modal-input" 
                        autoFocus 
                        type="text" 
                        value={inputValue}
                        onChange={event => setInputValue(event.target.value)}
                    />
                <div className="input-modal-buttons">
                    <button className="input-modal-left-button" onClick={handleLeftButton}> {leftText} </button>
                    <button className="input-modal-right-button" onClick={()=>{confirmAction()}}> {rightText} </button>
                </div>
            </div>
        </motion.div>

    )
}
