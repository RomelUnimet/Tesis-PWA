import React from 'react'
import '../../scss/modals/delete-confirm.scss'
import { motion } from 'framer-motion';

export const DeleteConfirm = ({confirmAction, setIsActive, numberDelete}) => {

    const handleCancelButton = () => {
        setIsActive(false)
    }

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    return (
        <>
            <motion.div 
                className="delete-modal-container" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:0.3}}

                onClick={handleCancelButton}
            />
            
            <motion.div 
                className="delete-modal" 
                initial={{x:0, y: SCREEN_HEIGHT }}
                animate={{x:0, y: 0 }}
                exit={{x:0, y: SCREEN_HEIGHT }}
                transition={{duration:0.3}}
            >
                
                <div  className="delete-modal-delete">
                    <h1> You can't undo this action. </h1>

                    <h2> This action will only delete these diaries on this device. Other devices Bin wont't be deleted. </h2>

                    <div 
                        className="delete-btn"
                        onClick={()=>confirmAction()} 
                    > 
                        <h4>Delete {numberDelete} diaries/diary</h4> 
                    </div>

                </div>

                       
                <div className="delete-modal-cancel"
                        onClick={handleCancelButton}
                >
                    <h3> Cancel </h3>
                </div>
                
            </motion.div>

        </>
    )
}
