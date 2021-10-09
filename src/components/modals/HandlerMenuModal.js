import React, { useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import '../../scss/modals/handlerMenu.scss';

export const HandlerMenuModal = ({modalState, setModalState, setUpdateInputModal, setDeleteModal}) => {

    const closeModal = () =>{
        animateClose()
        setTimeout(() => {
            setModalState({
                ...modalState,
                show:false,
            })
        }, 200);
        
    }

    //ANIMATIONS / GESTURES
   const SCREEN_HEIGHT = window.innerHeight;

   const [{ y }, api] = useSpring(() => ({ y: SCREEN_HEIGHT }));
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


   
    return (
        <>
            <div className="modal-container-handler"
                onClick={closeModal}
                style={ modalState.show? { display:'inline' } :{ display:'none' }}
            >
                
            </div>

            <animated.div className="handler-modal" style={{y: y, touchAction: 'none'}} {...bindModal()}  
            >

                
    
                    <div className="handler-modal-item"
                            onClick={()=>{
                                        setUpdateInputModal(true)
                                    }}
                    >
                        <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.8103 0.310196C25.909 0.211249 26.0263 0.132746 26.1554 0.079182C26.2844 0.0256183 26.4228 -0.00195313 26.5626 -0.00195312C26.7023 -0.00195312 26.8407 0.0256183 26.9698 0.079182C27.0989 0.132746 27.2161 0.211249 27.3148 0.310196L33.6898 6.6852C33.7888 6.78389 33.8673 6.90114 33.9208 7.03022C33.9744 7.15931 34.002 7.29769 34.002 7.43745C34.002 7.5772 33.9744 7.71558 33.9208 7.84467C33.8673 7.97375 33.7888 8.091 33.6898 8.1897L12.4398 29.4397C12.3379 29.541 12.2164 29.6205 12.0828 29.6734L1.45783 33.9234C1.26474 34.0007 1.05322 34.0197 0.84948 33.9779C0.645743 33.9361 0.458751 33.8354 0.311688 33.6883C0.164624 33.5413 0.0639553 33.3543 0.0221619 33.1505C-0.0196314 32.9468 -0.000711481 32.7353 0.0765762 32.5422L4.32658 21.9172C4.37955 21.7836 4.45907 21.6622 4.56033 21.5602L25.8103 0.310196ZM23.815 5.31245L28.6876 10.1851L31.4352 7.43745L26.5626 2.56482L23.815 5.31245ZM27.1852 11.6874L22.3126 6.81482L8.50008 20.6273V21.2499H9.56258C9.84437 21.2499 10.1146 21.3619 10.3139 21.5611C10.5131 21.7604 10.6251 22.0307 10.6251 22.3124V23.3749H11.6876C11.9694 23.3749 12.2396 23.4869 12.4389 23.6861C12.6381 23.8854 12.7501 24.1557 12.7501 24.4374V25.4999H13.3727L27.1852 11.6874ZM6.44308 22.6843L6.21783 22.9096L2.97083 31.0292L11.0905 27.7822L11.3157 27.5569C11.113 27.4812 10.9383 27.3454 10.8149 27.1677C10.6915 26.99 10.6252 26.7788 10.6251 26.5624V25.4999H9.56258C9.28078 25.4999 9.01053 25.388 8.81128 25.1887C8.61202 24.9895 8.50008 24.7192 8.50008 24.4374V23.3749H7.43758C7.22121 23.3748 7.01005 23.3086 6.83233 23.1852C6.65461 23.0617 6.51881 22.887 6.44308 22.6843Z" fill="#545454"/>                                   
                        </svg>
                            <p>Edit</p>
                    </div>
    
                    <hr></hr>
    
                    <div className="handler-modal-item"
                            onClick={()=>{setDeleteModal(true)}}
                    >
                        <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.625 7.3125L15.8438 2.4375H23.1562L24.375 7.3125M34.125 7.3125H7.3125L9.75 36.5625H29.25L31.6875 7.3125H4.875H34.125ZM19.5 14.625V29.25V14.625ZM25.5938 14.625L24.375 29.25L25.5938 14.625ZM13.4062 14.625L14.625 29.25L13.4062 14.625Z" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                            <p className="remove-name-tag">Remove</p>
                    </div>

                    
            </animated.div>
            </>
    )
}
