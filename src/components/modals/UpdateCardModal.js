import React, { useRef } from 'react'
import '../../scss/modals/updateCardModal.scss'
import { cardUpdateColor } from '../../actions/cards'
import { useDispatch } from 'react-redux'

export const UpdateCardModal = ({ modalState, setModalState, cropperState, setCropperState}) => {


    const dispatch = useDispatch();

    const colors = ['#65DBFF','#65BCFF','#6390FD','#6C65FF','#A064FF','#FE65CF',
                    '#FE659E','#FF6565','#FB8B65','#FFB466','#FFDE00','#B9E888',
                    '#87E99E','#87E9D2','#86DCEB','#C4C4C4','#B7B7B7','#999999',
                    '#6C6C6C','#373737'
                ]

    const closeModal = () =>{

        setModalState({
            show:false,
            card:{}
        })
    }

    const changeColor = (color) => {

        dispatch(cardUpdateColor(color,modalState.card ));
        closeModal();        
    }

    const fileInput = useRef(null);

    const changePhoto = ( e ) => {

        e.preventDefault();
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

        
        //FUNCIONA PERO NO SE SI ES DEMASIADO GRANDE

        
    }

   //PODEMOS HACER QUE SEA MENOS JANK LO OTRO

    return (
            <>
                <div className="modal-container"
                    onClick={closeModal}
                    style={ modalState.show? { display:'inline' } :{ display:'none' }}
                >
                    
                </div>

                <div className={modalState.show? "animate__animated animate__slideInUp modal" : "animate__animated animate__slideOutDown modal2" }  
                >
        
                        <div className="photo-container"
                        >
                            <label>
                                <input type="file" id="cardPhotoInput" onChange={changePhoto} ref={fileInput} accept="image/"/>
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
                    </div>
            </>
        )

    
}
