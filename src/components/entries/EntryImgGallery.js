import React, { useRef, useState } from 'react'
import '../../scss/entries/entry-img-gallery.scss'

import { Swiper, SwiperSlide } from 'swiper/react';
//Swiper Css
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
    Pagination
  } from 'swiper/core';

import '../../scss/create_entry/img_carrousel.scss'

import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

export const EntryImgGallery = ({images, fullscreen, setfullscreen, prevswiperRef}) => {


    const moreThanOne = (images.length>1)

    const swiperRef = useRef(null);  

    SwiperCore.use([Pagination]);

    const [opacity, setopacity] = useState(1)

    const [activeURL, setActiveURL] = useState(images[0].photo)

    //ANIMACION
    const [style, api] = useSpring(() => ({ y: 0, x:0, height: (window.innerHeight*0.42), backgroundColor:`rgb(0, 0, 0, ${0})`}))
    
    const {y, height} = style

    const bindCarrousel = useDrag(
        ({ last, vxvy: [, vy], movement: [, my]}) => {
            setopacity(0)
            if(fullscreen){
            if (last) {           //Hay que hacer una funcion que haga el close
                Math.abs(my) > 20 ?  closeFS() : openFS()
              } else{
                  if(Math.abs(my)===0){
                    setopacity(1)
                    api.start({ y:0, immediate: true })
                  }else{
                    if(Math.abs(my)<65){
                        api.start({ y:0, height:window.innerHeight-(Math.abs(my)*8), backgroundColor:`rgb(0, 0, 0, ${(1-(Math.abs(my)/100))})`, config:config.stiff })
                  }
                }
              } 
            } 
             
            },
        { initial: () => [0, y.get()], filterTaps: true, rubberband: false, axis:'y' }
        )

    const openFS = () => {
        setopacity(1)
        api.start({y:0, height:window.innerHeight, backgroundColor:`rgb(0, 0, 0, ${1})`,config:config.stiff} )

    }
    const closeFS = () => {
        api.start({y:0, height:(window.innerHeight*0.42), backgroundColor:`rgb(0, 0, 0, ${0})`, config:config.default} )
        setfullscreen(false)
        //PREVENT SWIPE WHEN IS ONLY ONE IMAGE
        prevswiperRef.current.swiper.allowTouchMove=true
        
    }
    const fullScreenAction = () => {
        if(fullscreen===false){
            openFS()
            setfullscreen(!fullscreen)
        }
        //PREVENT SWIPE WHEN IS ONLY ONE IMAGE
        prevswiperRef.current.swiper.allowTouchMove=false
    }

    const getimgsize = (img) => {
        var i = new Image(); 
        i.src = img.photo; 
        return i.width>i.height || i.width<window.innerWidth
    }

    const auxActiveUrlFoward = () => {
        let imgPosition = swiperRef.current?.swiper.activeIndex-1
        if(images.length===swiperRef.current?.swiper.activeIndex-1){
            imgPosition=0;
        }
        console.log(imgPosition)
        setActiveURL(images[imgPosition].photo)
    }

    const auxActiveUrlBackward = () => {
        let imgPosition = swiperRef.current?.swiper.activeIndex-1
        if(imgPosition===-1){
            imgPosition=images.length-1;
        }
        setActiveURL(images[imgPosition].photo)
    }

    
   
    return (
        
        
            <animated.div className="entry-img-gallery-container"
                {...bindCarrousel()}
                style={fullscreen ? { ...style , position:'fixed', touchAction: 'none'} : { height }}
            >
                    <Swiper
                        ref={swiperRef}    
                        loop={moreThanOne}       
                        pagination={moreThanOne}
                        allowTouchMove={moreThanOne}
                        className='entry-img-gallery-swiper-container'
                        onSlideNextTransitionStart={auxActiveUrlFoward}
                        onSlidePrevTransitionStart={auxActiveUrlBackward}
                    >

                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={()=>{closeFS()}}
                            className="close-icon-fullscreen"
                            style={!fullscreen?{display:'none'}:{opacity:opacity}}
                        >
                            <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44732 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" />
                        </svg>

                        <a href={activeURL} download >
                            <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="download-icon-fullscreen"
                                style={!fullscreen?{display:'none'}:{opacity:opacity}}
                            >
                                <path d="M10.6707 15.3622C10.5702 15.2639 10.4902 15.1467 10.4353 15.0173C10.3805 14.888 10.3518 14.749 10.351 14.6085C10.3502 14.4679 10.3773 14.3287 10.4307 14.1987C10.4841 14.0687 10.5627 13.9506 10.6621 13.8512C10.7615 13.7518 10.8795 13.6731 11.0095 13.6197C11.1395 13.5663 11.2788 13.5392 11.4193 13.5399C11.5598 13.5407 11.6988 13.5694 11.8282 13.6242C11.9576 13.6791 12.0748 13.759 12.1731 13.8595L15.9375 17.6229V5.3125C15.9375 5.03071 16.0494 4.76046 16.2487 4.5612C16.448 4.36194 16.7182 4.25 17 4.25C17.2818 4.25 17.552 4.36194 17.7513 4.5612C17.9506 4.76046 18.0625 5.03071 18.0625 5.3125V17.6229L21.8269 13.8595C21.9252 13.759 22.0424 13.6791 22.1718 13.6242C22.3012 13.5694 22.4402 13.5407 22.5807 13.5399C22.7212 13.5392 22.8605 13.5663 22.9905 13.6197C23.1205 13.6731 23.2385 13.7518 23.3379 13.8512C23.4373 13.9506 23.5159 14.0687 23.5693 14.1987C23.6227 14.3287 23.6498 14.4679 23.649 14.6085C23.6482 14.749 23.6195 14.888 23.5647 15.0173C23.5098 15.1467 23.4298 15.2639 23.3293 15.3622L17.7512 20.939C17.5519 21.1381 17.2817 21.25 17 21.25C16.7183 21.25 16.4481 21.1381 16.2488 20.939L10.6707 15.3622ZM28.6875 19.125C28.4057 19.125 28.1355 19.2369 27.9362 19.4362C27.7369 19.6355 27.625 19.9057 27.625 20.1875V27.625H6.375V20.1875C6.375 19.9057 6.26306 19.6355 6.0638 19.4362C5.86454 19.2369 5.59429 19.125 5.3125 19.125C5.03071 19.125 4.76046 19.2369 4.5612 19.4362C4.36194 19.6355 4.25 19.9057 4.25 20.1875V27.625C4.25063 28.1884 4.47472 28.7285 4.8731 29.1269C5.27147 29.5253 5.81161 29.7494 6.375 29.75H27.625C28.1884 29.7494 28.7285 29.5253 29.1269 29.1269C29.5253 28.7285 29.7494 28.1884 29.75 27.625V20.1875C29.75 19.9057 29.6381 19.6355 29.4388 19.4362C29.2395 19.2369 28.9693 19.125 28.6875 19.125Z"/>
                            </svg>
                        </a>
                        {
                            images.map((img, index)=>(
                                    <SwiperSlide 
                                        key={index} 
                                        className="entry-img-gallery-swiper-slide"
                                        onClick={fullScreenAction}
                                    >  
                                        <div
                                            className='entry-img-gallery-swiper-image-container'
                                            style={!fullscreen? {backgroundImage: `url(${img.photo})`}:{}}
                                        >
                                            {fullscreen?
                                            <img src={img.photo} alt='Altrernative' 
                                                 style={getimgsize(img)?{ width:'100%'}:{ height:'100%'}}
                                            />
                                            :
                                            <></>
                                            }
                                        </div>
                                        
                                        
                                    </SwiperSlide>
                                ))
                        }
                    </Swiper>
            </animated.div>
        
        
    )
}
