import React, { useEffect, useRef, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { Swiper, SwiperSlide } from 'swiper/react';
//Swiper Css
import "swiper/swiper.min.css";
import '../../scss/cards/monthcards.scss'

import {Card} from './Card'
import { UpdateCardModal } from '../modals/UpdateCardModal';
import { CardPickerModal } from '../modals/CardPickerModal';
import { CropperComponent } from '../ui/CropperComponent';
import { TopBar } from '../ui/TopBar';

import { AnimatePresence, motion } from "framer-motion"

import { useLastLocation } from 'react-router-last-location';
import { useLocation } from 'react-router';
import { storeLastCardPath } from '../../actions/navigation';



export const CardScreen = ( ) => {


    const [modalState, setModalState] = useState({
        show: false,
        card: {}
    });

    const [cardModalState, setCardModalState] = useState({
        show: false,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });

    const [cropperState, setCropperState] = useState({
        show: false,
        card:{},
        img: ''
    });
    

    const [swiperPosition, setSwiperPosition] = useState({
        isEnd: false,
        isBeginning: false,
    });

    const {cards} = useSelector(state => state.cards) //Esto puede traer un error ya que en una instancia es vacio (Probablemente por el dispatch async) => Tal vez necesita un check

    const months = cards.filter( (card) => card.year === cardModalState.year )  //Hay que guardar ese Year en un State lo mas probable

    const swiperRef = useRef(null);  

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const showCardModal = () => {

        setCardModalState({
            ...cardModalState,
            show:true
        })
    }

    useEffect(() => {
        
        swiperRef.current?.swiper.slideTo(cardModalState.month,0);

    }, [cardModalState.month, cards]);

    const navigateCard = ( month ) =>{

        swiperRef.current?.swiper.slideTo(month,200);
        
        if(month===11){
            setSwiperPosition({
                isBeginning: false,
                isEnd: true,
            })
        }
        if(month===0){
            setSwiperPosition({
                isBeginning: true,
                isEnd: false,
            })
        }

    }

    const checkEnd = () =>{

        setSwiperPosition({
            isBeginning: false,
            isEnd: false,
        })

        if(swiperRef.current?.swiper.activeIndex===11 && cardModalState.year!==cards[cards.length-1].year){
            setSwiperPosition({
                ...swiperPosition,
                isEnd: true,
            })
        }

        if(swiperRef.current?.swiper.activeIndex===0 && cardModalState.year!==cards[0].year){

            setSwiperPosition({
                ...swiperPosition,
                isBeginning: true,
            })

        }

        setCardModalState({
            ...cardModalState,
            month:swiperRef.current?.swiper.activeIndex,

        })

    }

    const nextYear = ()=>{
        
        if(cardModalState.year!==cards[cards.length-1].year){

            swiperRef.current?.swiper.slideTo(0,0)

            setCardModalState({
                ...cardModalState,
                year: cardModalState.year+1,
                month:0
            })

            setSwiperPosition({
                ...swiperPosition,
                isBeginning: true,
                isEnd: false,
            })
        }
    }

    const prevYear = ()=>{

        
        if(cardModalState.year!==cards[0].year){


            swiperRef.current?.swiper.slideTo(11,0);

            setCardModalState({
                ...cardModalState,
                year: cardModalState.year-1,
                month:11
            });


            setSwiperPosition({
                ...swiperPosition,
                isBeginning: false,
                isEnd: true,
            })
        }
    }

    const lastLocation = useLastLocation();
       
    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname.includes('/detailed')){
        
            return {
                    initial:{x:-40, transition:{duration:0.2} },
                    in:{x:0, transition:{duration:0.2} },
                    out:{x:-40, transition:{duration:0.2} }
                    }
        }else {
            return {
                    initial:{x:0, transition:{duration:0} },
                    in:{x:0, transition:{duration:0} },
                    out:{x:0, transition:{duration:0} }
                    }
        }
    })

    useEffect(() => {

        setvariants({
            
            initial:{x:0, transition:{duration:0} },
            in:{x:0, transition:{duration:0} },
            out:{x:0, transition:{duration:0} }
        })

        dispatch( storeLastCardPath(pathname) )
        
    }, [dispatch, pathname])

    if (cards.length===0){
        console.log(cards)
        return(
                //Puedo poner un esqueleto
                <>
                    Loading Cards...
                </>
                )
    }
    
    

    return (

        <motion.div
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
        >
            <div 
            className="card-screen-container"
            >

                <TopBar 
                    navigateCard={navigateCard}
                    cardModalState={cardModalState} 
                    setCardModalState={setCardModalState}
                />

                <div className="month-selector"
                    onClick={showCardModal}
                >
                    <h1>{cardModalState.year}</h1>
                    <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={40}
                        slidesPerView={'auto'} 
                        centeredSlides={true}
                        onSlideChangeTransitionEnd={checkEnd}
                    // onSwiper={() => swiperRef.current?.swiper.slideTo(cardModalState.month,0)}
                        >

                        {
                            months.map((month, index)=>(

                                <SwiperSlide key={index} > 
                                    <Card
                                        cid={ month.cid }
                                        color={ month.color }
                                        entries={ month.entries }
                                        month={ month.month }
                                        photo={ month.photo }
                                        uid={ month.uid }
                                        year={ month.year }
                                        modalState={modalState} 
                                        setModalState={setModalState}
                                        cropperState={cropperState}
                                        setCropperState={setCropperState}
                                        setvariants={setvariants}
                                    />
                                </SwiperSlide>
                            ))
                        }


                    </Swiper>

                    <button className="calendar-btn">CALENDAR</button>
                
                    

                    {
                        modalState.show &&
                        
                        <UpdateCardModal
                            modalState={modalState} 
                            setModalState={setModalState}
                            cropperState={cropperState}
                            setCropperState={setCropperState}
                        />
                    }
                    {
                        cardModalState.show &&
                        
                        <CardPickerModal
                            modalState={cardModalState} 
                            setModalState={setCardModalState}
                            navigateCard={navigateCard}
                        />
                    }

                    <AnimatePresence>
                        { 
                            cropperState.show &&
                            <CropperComponent
                                cropperState={cropperState}
                                setCropperState={setCropperState}
                            />
                        }
                    </AnimatePresence>

                    
                    {swiperPosition.isBeginning?
                        <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="animate__animated animate__fadeIn beginning-arrow"
                            onClick={prevYear}
                        >
                            <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        :
                        <>
                        </>
                    }
                    {swiperPosition.isEnd?
                        <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="animate__animated animate__fadeIn end-arrow"
                            onClick={nextYear}
                        >
                            <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        :
                        <>
                        </>
                    }

            </div>
        </motion.div>

        
    )
    
}


