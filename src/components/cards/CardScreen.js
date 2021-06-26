import React, { useEffect, useRef, useState }  from 'react'
import { useSelector } from 'react-redux'


import { Swiper, SwiperSlide } from 'swiper/react';
//Swiper Css
import "swiper/swiper.min.css";
import '../../scss/cards/monthcards.scss'

import {Card} from './Card'
import { UpdateCardModal } from '../modals/UpdateCardModal'
import { CardPickerModal } from '../modals/CardPickerModal';
import { CropperComponent } from '../ui/CropperComponent';


export const CardScreen = () => {

    
    

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

    useEffect(() => {
        
        swiperRef.current?.swiper.slideTo(cardModalState.month,0);

    }, [cardModalState.month]);

    const navigateCard= (month) =>{

        swiperRef.current?.swiper.slideTo(month,200);


    }


    const {cards} = useSelector(state => state.cards) //Esto puede traer un error ya que en una instancia es vacio (Probablemente por el dispatch async) => Tal vez necesita un check

    const months = cards.filter( (card) => card.year === cardModalState.year )  //Hay que guardar ese Year en un State lo mas probable

    const swiperRef = useRef(null);  

    const showCardModal = () => {

        setCardModalState({
            ...cardModalState,
            show:true
        })

    }



    /*
    const swiperSlideTo = ()=>{

        swiperRef.current?.swiper.slideTo(2,500);
        
    }
    */
    
    console.log('Doble render puede ser causado por la falta de un loading')
    console.log('El Doble get de Localbase es normal')
    console.log('Poner Loading en la screen')

    return (
        <div className="card-screen-container">

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
                    onSlideChange={() => console.log(swiperRef.current?.swiper.activeIndex)}
                    /*onSwiper={(swiper) => console.log(swiper)}*/
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
                                />
                            </SwiperSlide>
                        ))
                    }


                </Swiper>

                <button className="calendar-btn">CALENDAR</button>

                <UpdateCardModal
                    modalState={modalState} 
                    setModalState={setModalState}
                    cropperState={cropperState}
                    setCropperState={setCropperState}
                />
                <CardPickerModal
                    modalState={cardModalState} 
                    setModalState={setCardModalState}
                    navigateCard={navigateCard}
                />
                <CropperComponent
                    cropperState={cropperState}
                    setCropperState={setCropperState}
                />
        </div>

        
    )
}


