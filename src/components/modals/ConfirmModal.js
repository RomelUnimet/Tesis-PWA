import React from 'react'
import '../../scss/modals/confirmModal.scss'
import { animated, useTransition, config } from 'react-spring'

//FALTALOS ESTILOS DE TEXT

export const ConfirmModal = ({title, text, rightText, leftText, confirmAction, isActive, setIsActive}) => {

    
    const handleLeftButton = () => {

        setIsActive(false)

    }

    //ANIMATION
    const transition = useTransition(isActive, {
        from: {opacity:0},
        enter: {opacity:1},
        leave: {opacity:0},
        config: config.default
    });

    return (
        <>
            {transition((style, item) =>
                item?
                    <animated.div className="confirm-modal-container" style={style}>
                        <animated.div className="confirm-modal" style={style}>
                                <h1>{title}</h1>
                                <p>{text}</p>
                            <div className="confirm-modal-buttons">
                                <button className="confirm-modal-left-button" onClick={handleLeftButton}> {leftText} </button>
                                <button className="confirm-modal-right-button" onClick={()=>{confirmAction()}}> {rightText} </button>
                            </div>
                        </animated.div>
                    </animated.div>
                    :
                    ''
                )}
            

        </>

    )
}
