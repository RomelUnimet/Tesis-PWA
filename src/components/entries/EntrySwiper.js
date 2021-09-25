import React, { useRef, useState } from 'react'
import '../../scss/entries/entry-swiper.scss'
import { animated, useTransition } from 'react-spring'

import { Swiper, SwiperSlide } from 'swiper/react';
//Swiper Css
import "swiper/swiper.min.css";
import '../../scss/cards/monthcards.scss'
import { Entry } from './Entry';
import { HandleEntryModal } from '../modals/HandleEntryModal';
import { ConfirmModal } from '../modals/ConfirmModal';
import { EditEntryModal } from './EditEntryModal';

export const EntrySwiper = ({ entries, entrySwiperState, setEntrySwiperState }) => {

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    const transition = useTransition(entrySwiperState.show, {
        from: {x:0, y:SCREEN_HEIGHT, opacity:0.9},
        enter: {x:0, y:0, opacity:1},
        leave: {x:0, y:SCREEN_HEIGHT, opacity:0.9},
        config: { mass: 1, tension: 210, friction: 22, clamp:true }
    });
 
    const swiperRef = useRef(null); 

    const closeModal = () => {
        setEntrySwiperState({
            ...entrySwiperState,
            show:false,
        })
    }

    const [fullscreen, setfullscreen] = useState(false)
    
    const [modalState, setModalState] = useState(false)

    const [confirmModal, setConfirmModal] = useState(false)

    const [EditModalState, setEditModalState] = useState(false)

    return (
        <>
            {transition((style, item) =>  
                item?
                    <animated.div
                        style={style}
                        className="entry-swiper-container"
                    >
                        <Swiper
                            ref={swiperRef}
                            slidesPerView={1} 
                            initialSlide={entrySwiperState.activeEntry}
                            className="entry-swiper"
                        >

                            {
                                entries.map((entry, index)=>(

                                    <SwiperSlide 
                                        key={index} 
                                        className="entry-swiper-slide"
                                    > 
                                        <Entry
                                            entry={entry}
                                            fullscreen={fullscreen}
                                            setfullscreen={setfullscreen}
                                            setModalState={setModalState}
                                        />
                                    </SwiperSlide>
                                ))
                            }


                        </Swiper>

                        <div className="entry-swiper-bottom-bar"
                             style={fullscreen? {zIndex:0}:{}}
                        >
                            <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 onClick={()=>setModalState(true)}
                            >
                                <path d="M17.0001 19.8334C18.5649 19.8334 19.8334 18.5649 19.8334 17.0001C19.8334 15.4353 18.5649 14.1667 17.0001 14.1667C15.4353 14.1667 14.1667 15.4353 14.1667 17.0001C14.1667 18.5649 15.4353 19.8334 17.0001 19.8334Z" />
                                <path d="M26.9166 19.8334C28.4814 19.8334 29.7499 18.5649 29.7499 17.0001C29.7499 15.4353 28.4814 14.1667 26.9166 14.1667C25.3518 14.1667 24.0833 15.4353 24.0833 17.0001C24.0833 18.5649 25.3518 19.8334 26.9166 19.8334Z" />
                                <path d="M7.08333 19.8334C8.64814 19.8334 9.91667 18.5649 9.91667 17.0001C9.91667 15.4353 8.64814 14.1667 7.08333 14.1667C5.51853 14.1667 4.25 15.4353 4.25 17.0001C4.25 18.5649 5.51853 19.8334 7.08333 19.8334Z" />
                            </svg>
                            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 onClick={closeModal}
                            >
                                <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44732 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z"/>
                            </svg>
                        </div>

                        <HandleEntryModal
                            modalState={modalState}
                            setModalState={setModalState}
                            setConfirmModal={setConfirmModal}
                            setEditModalState={setEditModalState}
                        />
                        <ConfirmModal
                            title={'Are you sure you want to delete this diary entry?'}
                            text={'Deleted diaries are kept in the trash. (Settings > Data > Trash)'}
                            rightText={'Delete'} 
                            leftText={'Cancel'}
                            confirmAction={()=>console.log('trash')}
                            isActive={confirmModal}
                            setIsActive={setConfirmModal}
                        />

                        {EditModalState &&
                            <EditEntryModal
                                EditModalState={EditModalState}
                                setEditModalState={setEditModalState}
                                entry={entries[entrySwiperState.activeEntry]}
                            />
                        }
                        
                    </animated.div>

                    :
                    ''
            )}
        </>
    )
}
