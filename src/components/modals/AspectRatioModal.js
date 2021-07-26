import React from 'react'
import '../../scss/modals/aspectRatio.scss'
import { animated, useTransition, config } from 'react-spring'



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
     const transitionContainer = useTransition(aspectModal.show, {
        from: {opacity:0},
        enter: {opacity:1},
        leave: {opacity:0},
        config: config.default
    });

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    const transitionModal = useTransition(aspectModal.show, {
        from: {x:0, y:SCREEN_HEIGHT},
        enter: {x:0, y:0},
        leave: {x:0, y:SCREEN_HEIGHT},
    });

    return (
        <>
            {transitionContainer((style, item) =>
                item?
                    <animated.div className="aspect-modal-container" style={style}
                        onClick={closeModal}
                    />
                    :
                    ''
                )}

            {transitionModal((style, item) =>
                item?
                    <animated.div className="aspect-ratio-modal" style={style}>
                        {
                            isVertical?
                                ratios.map((ratio, index) => (
                                    <div key={index}>
                                        <h1>{ratio.aspect} </h1>
                                    </div>
                                ))
                                :
                                ratiosReverse.map((ratio, index) => (
                                    <div key={index}>
                                        <h1> {ratio.aspect} </h1>                                 
                                    </div>
                                ))

                        }
                        
                    </animated.div>
                    :
                    ''
                )}

        </>
    )
}
