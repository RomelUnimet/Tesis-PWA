import React from 'react'
import '../../scss/modals/aspectRatio.scss'
import { motion } from 'framer-motion';



export const AspectRatioModal = ({aspectModal, setAspectModal, cropperRef}) => {

    const isVertical = cropperRef.current?.cropper.getImageData().naturalHeight>cropperRef.current?.cropper.getImageData().naturalWidth;

    const ratios = [ 
        {name: 'Original', aspect: null},
        {name: 'Square', aspect: 1 / 1},
        {name: '2:3', aspect: 2 / 3},
        {name: '3:5', aspect: 3 / 5},
        {name: '3:4', aspect: 3 / 4},
        {name: '4:5', aspect: 4 / 5},
        {name: '5:7', aspect: 5 / 7},
        {name: '9:16', aspect: 9 / 16},
     ]

    const ratiosReverse = [ 
        {name: 'Original', aspect: null},
        {name: 'Square', aspect: 1 / 1},
        {name: '3:2', aspect: 3 / 2},
        {name: '5:3', aspect: 5 / 3},
        {name: '4:3', aspect: 4 / 3},
        {name: '5:4', aspect: 5 / 4},
        {name: '7:5', aspect: 7 / 5},
        {name: '16:9', aspect: 16 / 9},
     ]

    const closeModal = () => {
        setAspectModal({
            show:false,
            aspect: null,
        })
    }

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    return (
        <>
            <motion.div 
                className="aspect-modal-container" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{duration:0.3}}

                onClick={closeModal}
            />
            


            <motion.div 
                className="aspect-ratio-modal" 
                initial={{x:0, y: SCREEN_HEIGHT }}
                animate={{x:0, y: 0 }}
                exit={{x:0, y: SCREEN_HEIGHT }}
                transition={{duration:0.3}}
            >
                {
                    isVertical?
                        ratios.map((ratio, index) => (
                            <div key={index}>
                                <div  className="aspect-ratio-item"
                                    onClick={()=>setAspectModal({show:false, aspect:ratio.aspect })}
                                >
                                    <h3> { ratio.name } </h3>
                                </div>
                                <hr></hr>
                            </div>
                        ))
                        :
                        ratiosReverse.map((ratio, index) => (
                            <div key={index}>
                                <div  className="aspect-ratio-item"
                                    onClick={()=>setAspectModal({show:false, aspect:ratio.aspect})}
                                >
                                    <h3> { ratio.name } </h3>
                                </div>
                                <hr></hr>
                            </div>
                        ))

                }
                <div className="aspect-ratio-item aspect-ratio-item-cancel"
                        onClick={closeModal}
                >
                    <h3> Cancel </h3>
                </div>
                
            </motion.div>

        </>
    )
}
