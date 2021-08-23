import React from 'react'
import '../../scss/modals/inputModal.scss'
import { animated, useTransition, config } from 'react-spring'

//FALTALOS ESTILOS DE TEXT

export const InputModal = ({title, text, rightText, leftText, confirmAction, isActive, setIsActive, inputValue, setInputValue}) => {

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
                    <animated.div className="input-modal-container" style={style}>
                        <animated.div className="input-modal" style={style}>
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
                        </animated.div>
                    </animated.div>
                    :
                    ''
                )}
        </>

    )
}
