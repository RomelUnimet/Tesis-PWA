import React, { useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import '../../scss/modals/handleEntryModal.scss';


export const HandleEntryModal = ({modalState, setModalState, setConfirmModal, setEditModalState}) => {

    const closeModal = () =>{
        animateClose()
        setTimeout(() => {
            setModalState(false)
        }, 200);
        
    }

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
       if(modalState){      
           open()
       }
   }, [modalState,open])
   useEffect(() => {
       api.start({ y: SCREEN_HEIGHT, immediate: true }) 
   }, [SCREEN_HEIGHT,api])

   

    return (
        <>
            <div className="entry-modal-container-handler"
                onClick={closeModal}
                style={ modalState? { display:'inline' } :{ display:'none' }}
            >
                    
            </div>

            {modalState &&
                <animated.div className="entry-handler-modal" style={{y: y, touchAction: 'none'}} {...bindModal()}  
                >

                        <div className="entry-handler-modal-item"
                             onClick={()=>{}}
                        >
                            <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6707 15.3622C10.5702 15.2639 10.4902 15.1467 10.4353 15.0173C10.3805 14.888 10.3518 14.749 10.351 14.6085C10.3502 14.4679 10.3773 14.3287 10.4307 14.1987C10.4841 14.0687 10.5627 13.9506 10.6621 13.8512C10.7615 13.7518 10.8795 13.6731 11.0095 13.6197C11.1395 13.5663 11.2788 13.5392 11.4193 13.5399C11.5598 13.5407 11.6988 13.5694 11.8282 13.6242C11.9576 13.6791 12.0748 13.759 12.1731 13.8595L15.9375 17.6229V5.3125C15.9375 5.03071 16.0494 4.76046 16.2487 4.5612C16.448 4.36194 16.7182 4.25 17 4.25C17.2818 4.25 17.552 4.36194 17.7513 4.5612C17.9506 4.76046 18.0625 5.03071 18.0625 5.3125V17.6229L21.8269 13.8595C21.9252 13.759 22.0424 13.6791 22.1718 13.6242C22.3012 13.5694 22.4402 13.5407 22.5807 13.5399C22.7212 13.5392 22.8605 13.5663 22.9905 13.6197C23.1205 13.6731 23.2385 13.7518 23.3379 13.8512C23.4373 13.9506 23.5159 14.0687 23.5693 14.1987C23.6227 14.3287 23.6498 14.4679 23.649 14.6085C23.6482 14.749 23.6195 14.888 23.5647 15.0173C23.5098 15.1467 23.4298 15.2639 23.3293 15.3622L17.7512 20.939C17.5519 21.1381 17.2817 21.25 17 21.25C16.7183 21.25 16.4481 21.1381 16.2488 20.939L10.6707 15.3622ZM28.6875 19.125C28.4057 19.125 28.1355 19.2369 27.9362 19.4362C27.7369 19.6355 27.625 19.9057 27.625 20.1875V27.625H6.375V20.1875C6.375 19.9057 6.26306 19.6355 6.0638 19.4362C5.86454 19.2369 5.59429 19.125 5.3125 19.125C5.03071 19.125 4.76046 19.2369 4.5612 19.4362C4.36194 19.6355 4.25 19.9057 4.25 20.1875V27.625C4.25063 28.1884 4.47472 28.7285 4.8731 29.1269C5.27147 29.5253 5.81161 29.7494 6.375 29.75H27.625C28.1884 29.7494 28.7285 29.5253 29.1269 29.1269C29.5253 28.7285 29.7494 28.1884 29.75 27.625V20.1875C29.75 19.9057 29.6381 19.6355 29.4388 19.4362C29.2395 19.2369 28.9693 19.125 28.6875 19.125Z" fill="#545454"/>
                            </svg>
                            <p>Save Diary (Image)</p>
                        </div>

                        <hr></hr>

                        <div className="entry-handler-modal-item"
                             onClick={()=>{ 
                                setEditModalState(true) 
                                closeModal()
                            }}
                        >
                            <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.8103 0.310196C25.909 0.211249 26.0263 0.132746 26.1554 0.079182C26.2844 0.0256183 26.4228 -0.00195313 26.5626 -0.00195312C26.7023 -0.00195312 26.8407 0.0256183 26.9698 0.079182C27.0989 0.132746 27.2161 0.211249 27.3148 0.310196L33.6898 6.6852C33.7888 6.78389 33.8673 6.90114 33.9208 7.03022C33.9744 7.15931 34.002 7.29769 34.002 7.43745C34.002 7.5772 33.9744 7.71558 33.9208 7.84467C33.8673 7.97375 33.7888 8.091 33.6898 8.1897L12.4398 29.4397C12.3379 29.541 12.2164 29.6205 12.0828 29.6734L1.45783 33.9234C1.26474 34.0007 1.05322 34.0197 0.84948 33.9779C0.645743 33.9361 0.458751 33.8354 0.311688 33.6883C0.164624 33.5413 0.0639553 33.3543 0.0221619 33.1505C-0.0196314 32.9468 -0.000711481 32.7353 0.0765762 32.5422L4.32658 21.9172C4.37955 21.7836 4.45907 21.6622 4.56033 21.5602L25.8103 0.310196ZM23.815 5.31245L28.6876 10.1851L31.4352 7.43745L26.5626 2.56482L23.815 5.31245ZM27.1852 11.6874L22.3126 6.81482L8.50008 20.6273V21.2499H9.56258C9.84437 21.2499 10.1146 21.3619 10.3139 21.5611C10.5131 21.7604 10.6251 22.0307 10.6251 22.3124V23.3749H11.6876C11.9694 23.3749 12.2396 23.4869 12.4389 23.6861C12.6381 23.8854 12.7501 24.1557 12.7501 24.4374V25.4999H13.3727L27.1852 11.6874ZM6.44308 22.6843L6.21783 22.9096L2.97083 31.0292L11.0905 27.7822L11.3157 27.5569C11.113 27.4812 10.9383 27.3454 10.8149 27.1677C10.6915 26.99 10.6252 26.7788 10.6251 26.5624V25.4999H9.56258C9.28078 25.4999 9.01053 25.388 8.81128 25.1887C8.61202 24.9895 8.50008 24.7192 8.50008 24.4374V23.3749H7.43758C7.22121 23.3748 7.01005 23.3086 6.83233 23.1852C6.65461 23.0617 6.51881 22.887 6.44308 22.6843Z" fill="#545454"/>                                   
                            </svg>
                            <p>Edit</p>
                        </div>
            
                        <hr></hr>
            
                        <div className="entry-handler-modal-item"
                             onClick={()=>setConfirmModal(true)}
                        >
                            <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.625 7.3125L15.8438 2.4375H23.1562L24.375 7.3125M34.125 7.3125H7.3125L9.75 36.5625H29.25L31.6875 7.3125H4.875H34.125ZM19.5 14.625V29.25V14.625ZM25.5938 14.625L24.375 29.25L25.5938 14.625ZM13.4062 14.625L14.625 29.25L13.4062 14.625Z" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="remove-name-tag">Delete</p>
                        </div>

                            
                </animated.div>
                }
                
        </>
    )
}
