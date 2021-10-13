import React, { useEffect, useState } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../scss/ui/imgeditor.scss'
import { useRef } from 'react';
import { AspectRatioModal } from '../modals/AspectRatioModal';
import { AnimatePresence, motion } from 'framer-motion';


export const ImgEditor = ({ editorState, setEditorState, entryImgState, setEntryImgState }) => {

    const cropperRef = useRef(null);

    const [aspectModal, setAspectModal] = useState({
        show:false,
        aspect: null,
    })

    const onCrop = () => {

        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
      
        const croppedImg = cropper.getCroppedCanvas().toDataURL( 'image/', 0.5 ); //Numero 1 representa la calidad de la img y va de 0.1 a 1
        
        let auxArray = entryImgState

        auxArray[editorState.index].photo = croppedImg

        setEntryImgState([...auxArray])

        cancel();

    };

    const cancel = () => {

        setAspectModal({
            show:false,
            aspect: null
        })
        setEditorState({
            ...editorState,
            show:false,
            img:'', 
            index: 100
        })

    }
    const reset = () => {
        cropperRef?.current.cropper.reset()
    }

    const rotateRight = () => {
        cropperRef?.current.cropper.rotate(90)
    }
    const rotateLeft = () => {
        cropperRef?.current.cropper.rotate(-90)
    }

    const changeAspectRatio = () => {

        if(aspectModal.aspect==null){
            setAspectModal({
                show:true,
                aspect: null,
            })
        } else {
            setAspectModal({
                ...aspectModal,
                aspect:null,
            })
        }
        
    }

   

    useEffect(() => {
        
        cropperRef?.current?.cropper.setAspectRatio(aspectModal.aspect);
    
    }, [aspectModal])

    //PARA QUE LAS IMG VERTICALES NO SE COMPORTEN RARO
    useEffect(() => {

        cropperRef?.current?.cropper.rotateTo(0)

    }, [])

     //ANIMATION
     const SCREEN_HEIGHT = window.innerHeight;

    return (

     
        <motion.div 
            className="cropper-container" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: SCREEN_HEIGHT }}
            transition={{duration:0.3}}
        >
                <Cropper
                    style={{ height: '60%', width: "100%" }}
                    aspectRatio={ aspectModal.aspect }
                    viewMode={3}
                    background={false}
                    responsive={true}
                    autoCropArea={0.8}
                    dragMode={"move"}
                    cropBoxMovable={true} //Cambiarlo si es necesario, no se siente muy bien         
                    guides={true}  //Ver si puedo apagarlas cuando se mueve
                    src={editorState.img}
                    center={false}
                    ref={cropperRef}
                /> 
                
            

            <div className="editor-toolbar">
                <button 
                    className="cropper-btn-cancel"
                    onClick={cancel}
                >
                        Cancel
                </button>

                <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={rotateLeft}
                >
                    <path d="M2 28V16C2.00053 15.4697 2.21141 14.9613 2.58637 14.5864C2.96133 14.2114 3.46973 14.0005 4 14H16C16.5303 14.0005 17.0387 14.2114 17.4136 14.5864C17.7886 14.9613 17.9995 15.4697 18 16V28C17.9995 28.5303 17.7886 29.0387 17.4136 29.4136C17.0387 29.7886 16.5303 29.9995 16 30H4C3.46973 29.9995 2.96133 29.7886 2.58637 29.4136C2.21141 29.0387 2.00053 28.5303 2 28Z"/>
                    <path d="M17 2L18.41 3.41L15.83 6H21C22.8559 6.00212 24.6351 6.7403 25.9474 8.05259C27.2597 9.36489 27.9979 11.1441 28 13V18H26V13C25.9984 11.6744 25.4711 10.4036 24.5338 9.46622C23.5964 8.52888 22.3256 8.00159 21 8H15.83L18.41 10.59L17 12L12 7L17 2Z" />
                </svg>


                <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={reset}
                >
                    <path d="M18 28C20.3734 28 22.6935 27.2962 24.6668 25.9776C26.6402 24.6591 28.1783 22.7849 29.0866 20.5922C29.9948 18.3995 30.2324 15.9867 29.7694 13.6589C29.3064 11.3312 28.1635 9.19295 26.4853 7.51472C24.8071 5.83649 22.6689 4.6936 20.3411 4.23058C18.0133 3.76756 15.6005 4.0052 13.4078 4.91345C11.2151 5.8217 9.34094 7.35977 8.02236 9.33316C6.70379 11.3066 6 13.6266 6 16V22.2L2.4 18.6L1 20L7 26L13 20L11.6 18.6L8 22.2V16C8 14.0222 8.58649 12.0888 9.6853 10.4443C10.7841 8.79981 12.3459 7.51809 14.1732 6.76121C16.0004 6.00433 18.0111 5.8063 19.9509 6.19215C21.8907 6.578 23.6725 7.53041 25.0711 8.92894C26.4696 10.3275 27.422 12.1093 27.8079 14.0491C28.1937 15.9889 27.9957 17.9996 27.2388 19.8268C26.4819 21.6541 25.2002 23.2159 23.5557 24.3147C21.9112 25.4135 19.9778 26 18 26V28Z"/>
                </svg>

                <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={!aspectModal.aspect? {fill:'white',transition: 'ease-in-out', transitionDuration: '0.2s'} : {fill:'#3CDAFD',transition: 'ease-in-out', transitionDuration: '0.2s'} }
                    onClick={changeAspectRatio}
                >
                    <path d="M0 23.4375V6.5625C0 5.81658 0.296316 5.10121 0.823762 4.57376C1.35121 4.04632 2.06658 3.75 2.8125 3.75H27.1875C27.9334 3.75 28.6488 4.04632 29.1762 4.57376C29.7037 5.10121 30 5.81658 30 6.5625V23.4375C30 24.1834 29.7037 24.8988 29.1762 25.4262C28.6488 25.9537 27.9334 26.25 27.1875 26.25H2.8125C2.06658 26.25 1.35121 25.9537 0.823762 25.4262C0.296316 24.8988 0 24.1834 0 23.4375H0ZM4.6875 7.5C4.43886 7.5 4.2004 7.59877 4.02459 7.77459C3.84877 7.9504 3.75 8.18886 3.75 8.4375V14.0625C3.75 14.3111 3.84877 14.5496 4.02459 14.7254C4.2004 14.9012 4.43886 15 4.6875 15C4.93614 15 5.1746 14.9012 5.35041 14.7254C5.52623 14.5496 5.625 14.3111 5.625 14.0625V9.375H10.3125C10.5611 9.375 10.7996 9.27623 10.9754 9.10041C11.1512 8.9246 11.25 8.68614 11.25 8.4375C11.25 8.18886 11.1512 7.9504 10.9754 7.77459C10.7996 7.59877 10.5611 7.5 10.3125 7.5H4.6875ZM25.3125 22.5C25.5611 22.5 25.7996 22.4012 25.9754 22.2254C26.1512 22.0496 26.25 21.8111 26.25 21.5625V15.9375C26.25 15.6889 26.1512 15.4504 25.9754 15.2746C25.7996 15.0988 25.5611 15 25.3125 15C25.0639 15 24.8254 15.0988 24.6496 15.2746C24.4738 15.4504 24.375 15.6889 24.375 15.9375V20.625H19.6875C19.4389 20.625 19.2004 20.7238 19.0246 20.8996C18.8488 21.0754 18.75 21.3139 18.75 21.5625C18.75 21.8111 18.8488 22.0496 19.0246 22.2254C19.2004 22.4012 19.4389 22.5 19.6875 22.5H25.3125Z"/>
                </svg>

                <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={rotateRight}
                >
                    <path d="M30 28V16C29.9995 15.4697 29.7886 14.9613 29.4136 14.5864C29.0387 14.2114 28.5303 14.0005 28 14H16C15.4697 14.0005 14.9613 14.2114 14.5864 14.5864C14.2114 14.9613 14.0005 15.4697 14 16V28C14.0005 28.5303 14.2114 29.0387 14.5864 29.4136C14.9613 29.7886 15.4697 29.9995 16 30H28C28.5303 29.9995 29.0387 29.7886 29.4136 29.4136C29.7886 29.0387 29.9995 28.5303 30 28Z" />
                    <path d="M15 2L13.59 3.41L16.17 6H11C9.14413 6.00212 7.36489 6.7403 6.05259 8.05259C4.7403 9.36489 4.00212 11.1441 4 13V18H6V13C6.00159 11.6744 6.52888 10.4036 7.46622 9.46622C8.40356 8.52888 9.6744 8.00159 11 8H16.17L13.59 10.59L15 12L20 7L15 2Z" />
                </svg>

                <button 
                    className="cropper-btn-done"
                    onClick={onCrop}
                >
                        Done
                </button>
            </div>

            <AnimatePresence>
                {
                    aspectModal.show &&
                    <AspectRatioModal
                        aspectModal={aspectModal}
                        setAspectModal={setAspectModal}
                        cropperRef={cropperRef}
                    />
                }
            </AnimatePresence>
            
            
        </motion.div>
                   
    )
    
}
