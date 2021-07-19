import React, { useCallback, useEffect, useRef } from 'react'
import '../../scss/modals/updateCardModal.scss'
import { cardUpdateColor } from '../../actions/cards'
import { useDispatch } from 'react-redux'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

export const UpdateCardModal = ({ modalState, setModalState, cropperState, setCropperState}) => {


    const dispatch = useDispatch();

    const colors = ['#65DBFF','#65BCFF','#6390FD','#6C65FF','#A064FF','#FE65CF',
                    '#FE659E','#FF6565','#FB8B65','#FFB466','#FFDE00','#B9E888',
                    '#87E99E','#87E9D2','#86DCEB','#C4C4C4','#B7B7B7','#999999',
                    '#6C6C6C','#373737'
                ]

    const closeModal = () =>{
        animateClose()
        setTimeout(() => {
            setModalState({
                show:false,
                card:{}
            })
        }, 200);
        
    }

    const changeColor = (color) => {
        dispatch(cardUpdateColor(color,modalState.card ));
        closeModal();        
    }

    const fileInput = useRef(null);

    const changePhoto = ( e ) => {


        e.preventDefault();

        if(!!fileInput.current?.files[0]) {

            const reader = new FileReader();
            reader.readAsDataURL(fileInput.current?.files[0])
            
            reader.onload = () => {

                setCropperState({
                    ...cropperState,
                    show:true,
                    img: reader.result
                })
                setCropperState({
                    ...cropperState,
                    show:true,
                })

                closeModal();
            };
        
        }
        //FUNCIONA PERO NO SE SI ES DEMASIADO GRANDE   
    }

   //PODEMOS HACER QUE SEA MENOS JANK LO OTRO

   //ANIMATIONS / GESTURES
   const SCREEN_HEIGHT = window.innerHeight;

    const [{ y }, api] = useSpring(() => ({ y: 0 }));
    const height = 330; //CAMBIAR SI ES NECESARIO

    const open = useCallback(() => {
        api.start({ y: 0, immediate: false, config: {mass: 1, tension: 210, friction: 26} })
    }, [api] )
    

    const close = () => {
        animateClose()
        setTimeout(() => {
            closeModal();
        }, 200);
    }
    const bindModal = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], canceled }) => {
          if (my < -40) close() 
    
          if (last) {
            my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled })
          }
          else api.start({ y: my, immediate: true })
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: false }
      )

    const animateClose = () => {
        api.start({ y: SCREEN_HEIGHT, immediate: false, config: {mass: 1, tension: 200, friction: 26} })
    } 

    useEffect(() => {
        if(modalState.show){      
            open()
        }
    }, [modalState,open])
    useEffect(() => {
        api.start({ y: SCREEN_HEIGHT, immediate: true }) 
    }, [SCREEN_HEIGHT,api])

    return (
            <>
                <div className="modal-container"
                    onClick={closeModal}
                    style={ modalState.show? { display:'inline' } :{ display:'none' }}
                >
                    
                </div>

                {modalState.show?
                    <animated.div className="modal" style={{y: y, touchAction: 'none'}} {...bindModal()}  
                    >
            
                            <div className="photo-container"
                            >
                                <label>
                                    <input type="file" id="cardPhotoInput" onChange={changePhoto} ref={fileInput} accept="image/*"/>
                                    <h1>PHOTO</h1>
                                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </label>
                            </div>
            
                            <hr></hr>
            
                            <div className="color-picker">
                                <div className="color-title">
                                    <h1>COLOR</h1>
                                </div>
                                
                                <div className="colors-container">
                                    {colors.map((color)=>(
                                        <div 
                                            className="color-icon" 
                                            style={{backgroundColor:color}}
                                            key={color}
                                            onClick={()=>{changeColor(color)}}
                                        >
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </animated.div>
                    :
                    <></>
            
                }
                
            </>
        )

    
}
