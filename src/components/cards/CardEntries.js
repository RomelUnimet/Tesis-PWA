import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../scss/cards/card-details.scss'

import { motion } from "framer-motion";
import { EntryTab } from './EntryTab';
import { ConfirmModal } from './../modals/ConfirmModal'
import { useLastLocation } from 'react-router-last-location';
import { useLocation } from 'react-router';

import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType
  } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { trashEntry } from '../../actions/entry';
import { EntrySwiper } from '../entries/EntrySwiper';
import { storeLastCardPath } from '../../actions/navigation';


export const CardEntries = ( ) => {

    //Validar si es un ID Valido
    const { id } = useParams();
    const {cards} = useSelector(state => state.cards)
    const [card] = cards.filter( (card) => card.cid === id )

    const {entries} = useSelector(state => state.entries)
    const [ filteredEntries, setFilteredEntries ] = useState(entries.filter( (entry) => (card.cid === entry.cid && entry.trash===false) ))

    const monthName = new Date(card.year,card.month)
    const shortMonthName = monthName.toLocaleString('en-US', { month: 'long' }).toUpperCase()

    const [confirmModal, setConfirmModal] = useState(false)

    const [selectedEntry, setselectedEntry] = useState('')

    const [entrySwiperState, setEntrySwiperState] = useState({
        show:false,
        activeEntry:0
    })

    const [orderAscend, setOrderAscend] = useState(true);

    const changeOrder = () => {
        setOrderAscend(!orderAscend);
        setFilteredEntries([...filteredEntries.reverse()])
    }
    const history = useHistory();

    const goBack = (e) =>{
        e.preventDefault()
        setvariants({
            initial:{x:SCREEN_WIDTH},
            in:{x:0},
            out:{x:SCREEN_WIDTH}
        })
        history.push('/cards');
    }

    const dispatch = useDispatch();

    const SCREEN_WIDTH = window.innerWidth;

    useEffect(() => {
        setFilteredEntries(entries.filter( (entry) => (card.cid === entry.cid && entry.trash===false) ))
    }, [entries, card])

    //Tengo que buscar una manera de que cuando se le de click a la navbar cambie la a imacion de salida de esto a otra
    //GUARDAR LA ULTIMA RUTA QUE SE ACCEDIO DE LAS ENTRIES Y QUE LA NEVEHACION SEA DIRECTO A ESA RUTA
    //COMO AHORA VA A TENER ALGUNA COSA DE PROFILE SE PUEDE HACER EL FILTRO MAS FACIL

    //Navigation 
    const lastLocation = useLastLocation();
       
    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname.includes('/card')){
        
            return  {
                    initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
                    in:{x:0, transition:{ ease:'easeOut'}},
                    out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
                    }
        }else {
            return  {
                    initial:{x:0, opacity:1, transition:{duration:0, ease:'linear'} },
                    in:{x:0, opacity:1, transition:{duration:0, ease:'linear'} },
                    out:{x:0, opacity:0, transition:{duration:0, ease:'linear'} }
                    }
        }
    })

    useEffect(() => {
        setvariants({
            initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
            in:{x:0, transition:{ ease:'easeOut'}},
            out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
        })
    }, [SCREEN_WIDTH])

    const {pathname} = useLocation();

    useEffect(() => {
        dispatch( storeLastCardPath(pathname) )
    }, [dispatch, pathname])

    const {navigatingTo} = useSelector(state => state.navigation)

    useEffect(() => {
        console.log(navigatingTo)
        
        if(navigatingTo==='profile'){ 
            setvariants({
                initial:{x:0, opacity:1, transition:{duration:0,ease:'linear'} },
                in:{x:0, opacity:1, transition:{duration:0,ease:'linear'} },
                out:{x:0, opacity:0, transition:{duration:0, ease:'linear'} }
                })
        }
        
    }, [navigatingTo])

    //SWIPE TO DELETE
    const trailingActions = ( entry ) => (
        <TrailingActions>
          <SwipeAction
            destructive={false}
            onClick={() => {
                setConfirmModal(true)
                setselectedEntry(entry)
            }}
            style={{backgroundColor: 'red'}}
          >
              <div className="entry-delete-swipe">
                    Delete
              </div>
          </SwipeAction>
        </TrailingActions>
      );


    const sendEntrytoTrash = () => {
        
        dispatch( trashEntry(selectedEntry) )
        setConfirmModal(false)
    }
    

    if(!card){
        return(<>Espere</>)
    }
    
    return (

        <>
            <motion.div className="detail-card-container"
                variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ type:'tween'}}
            >
                <div className="d-c-topbar">
                    <div className="d-c-topbar-layout">

                        <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={goBack}
                        >
                            <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z" />
                        </svg>

                        <p> {shortMonthName} / {card.year} </p>

                        { orderAscend?
                            <svg   viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={changeOrder}>
                                <path d="M35.6627 13.0869L29.4128 6.83801L29.4122 6.83754C29.3684 6.79384 29.3203 6.75459 29.2688 6.72036L29.2583 6.71411C29.2102 6.68284 29.1594 6.65606 29.1064 6.63411L29.0944 6.62973C29.0417 6.60869 28.9872 6.59253 28.9316 6.58145C28.9286 6.58083 28.9256 6.58067 28.9225 6.58004C28.8086 6.55798 28.6914 6.55798 28.5775 6.58004C28.5744 6.58067 28.5713 6.58082 28.5683 6.58161C28.5127 6.59265 28.4582 6.60876 28.4055 6.62973L28.3936 6.63411C28.3405 6.65609 28.2895 6.68292 28.2413 6.71426C28.2381 6.71645 28.2347 6.71817 28.2314 6.7202C28.1793 6.75479 28.1308 6.79446 28.0866 6.83864L21.837 13.0882C21.6612 13.264 21.5625 13.5025 21.5625 13.7511C21.5625 13.9998 21.6613 14.2382 21.8371 14.414C22.0129 14.5898 22.2514 14.6886 22.5001 14.6886C22.7487 14.6886 22.9872 14.5898 23.163 14.4139L27.8125 9.76442V22.501C27.8125 22.7496 27.9113 22.9881 28.0871 23.1639C28.2629 23.3397 28.5014 23.4385 28.75 23.4385C28.9986 23.4385 29.2371 23.3397 29.4129 23.1639C29.5887 22.9881 29.6875 22.7496 29.6875 22.501V9.76426L34.337 14.413C34.4238 14.5012 34.5272 14.5714 34.6413 14.6194C34.7553 14.6675 34.8778 14.6924 35.0015 14.6929C35.1253 14.6934 35.2479 14.6694 35.3623 14.6223C35.4768 14.5751 35.5807 14.5058 35.6682 14.4183C35.7557 14.3308 35.825 14.2268 35.8722 14.1123C35.9193 13.9979 35.9433 13.8753 35.9427 13.7515C35.9422 13.6278 35.9172 13.5053 35.8691 13.3913C35.8211 13.2773 35.7509 13.1739 35.6627 13.0871V13.0869ZM18.75 20.9385H7.5C7.25136 20.9385 7.0129 20.8397 6.83709 20.6639C6.66127 20.4881 6.5625 20.2496 6.5625 20.001C6.5625 19.7523 6.66127 19.5139 6.83709 19.3381C7.0129 19.1623 7.25136 19.0635 7.5 19.0635H18.7498C18.9985 19.0635 19.2369 19.1623 19.4128 19.3381C19.5886 19.5139 19.6873 19.7523 19.6873 20.001C19.6873 20.2496 19.5886 20.4881 19.4128 20.6639C19.2369 20.8397 18.9985 20.9385 18.7498 20.9385H18.75ZM7.5 29.0635H28.7498C28.9985 29.0635 29.2369 29.1622 29.4128 29.3381C29.5886 29.5139 29.6873 29.7523 29.6873 30.001C29.6873 30.2496 29.5886 30.4881 29.4128 30.6639C29.2369 30.8397 28.9985 30.9385 28.7498 30.9385H7.5C7.25136 30.9385 7.0129 30.8397 6.83709 30.6639C6.66127 30.4881 6.5625 30.2496 6.5625 30.001C6.5625 29.7523 6.66127 29.5139 6.83709 29.3381C7.0129 29.1622 7.25136 29.0635 7.5 29.0635ZM16.25 10.9385H7.5C7.25136 10.9385 7.0129 10.8397 6.83709 10.6639C6.66127 10.4881 6.5625 10.2496 6.5625 10.001C6.5625 9.75234 6.66127 9.51389 6.83709 9.33807C7.0129 9.16225 7.25136 9.06348 7.5 9.06348H16.25C16.4986 9.06348 16.7371 9.16225 16.9129 9.33807C17.0887 9.51389 17.1875 9.75234 17.1875 10.001C17.1875 10.2496 17.0887 10.4881 16.9129 10.6639C16.7371 10.8397 16.4986 10.9385 16.25 10.9385Z" />
                            </svg>
                            :
                            <svg  viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                            onClick={changeOrder}>
                                <path d="M35.6627 26.9131L29.4128 33.162L29.4122 33.1625C29.3684 33.2062 29.3203 33.2454 29.2688 33.2796L29.2583 33.2859C29.2102 33.3172 29.1594 33.3439 29.1064 33.3659L29.0944 33.3703C29.0417 33.3913 28.9872 33.4075 28.9316 33.4185C28.9286 33.4192 28.9256 33.4193 28.9225 33.42C28.8086 33.442 28.6914 33.442 28.5775 33.42C28.5744 33.4193 28.5713 33.4192 28.5683 33.4184C28.5127 33.4073 28.4582 33.3912 28.4055 33.3703L28.3936 33.3659C28.3405 33.3439 28.2895 33.3171 28.2413 33.2857C28.2381 33.2836 28.2347 33.2818 28.2314 33.2798C28.1793 33.2452 28.1308 33.2055 28.0866 33.1614L21.837 26.9118C21.6612 26.736 21.5625 26.4975 21.5625 26.2489C21.5625 26.0002 21.6613 25.7618 21.8371 25.586C22.0129 25.4102 22.2514 25.3114 22.5001 25.3114C22.7487 25.3114 22.9872 25.4102 23.163 25.5861L27.8125 30.2356V17.499C27.8125 17.2504 27.9113 17.0119 28.0871 16.8361C28.2629 16.6603 28.5014 16.5615 28.75 16.5615C28.9986 16.5615 29.2371 16.6603 29.4129 16.8361C29.5887 17.0119 29.6875 17.2504 29.6875 17.499V30.2357L34.337 25.587C34.4238 25.4988 34.5272 25.4286 34.6413 25.3806C34.7553 25.3325 34.8778 25.3076 35.0015 25.3071C35.1253 25.3066 35.2479 25.3306 35.3623 25.3777C35.4768 25.4249 35.5807 25.4942 35.6682 25.5817C35.7557 25.6692 35.825 25.7732 35.8722 25.8877C35.9193 26.0021 35.9433 26.1247 35.9427 26.2485C35.9422 26.3722 35.9172 26.4947 35.8691 26.6087C35.8211 26.7227 35.7509 26.8261 35.6627 26.9129V26.9131ZM18.75 19.0615H7.5C7.25136 19.0615 7.0129 19.1603 6.83709 19.3361C6.66127 19.5119 6.5625 19.7504 6.5625 19.999C6.5625 20.2477 6.66127 20.4861 6.83709 20.6619C7.0129 20.8377 7.25136 20.9365 7.5 20.9365H18.7498C18.9985 20.9365 19.2369 20.8377 19.4128 20.6619C19.5886 20.4861 19.6873 20.2477 19.6873 19.999C19.6873 19.7504 19.5886 19.5119 19.4128 19.3361C19.2369 19.1603 18.9985 19.0615 18.7498 19.0615H18.75ZM7.5 10.9365H28.7498C28.9985 10.9365 29.2369 10.8378 29.4128 10.6619C29.5886 10.4861 29.6873 10.2477 29.6873 9.99902C29.6873 9.75038 29.5886 9.51193 29.4128 9.33611C29.2369 9.1603 28.9985 9.06152 28.7498 9.06152H7.5C7.25136 9.06152 7.0129 9.1603 6.83709 9.33611C6.66127 9.51193 6.5625 9.75038 6.5625 9.99902C6.5625 10.2477 6.66127 10.4861 6.83709 10.6619C7.0129 10.8378 7.25136 10.9365 7.5 10.9365ZM16.25 29.0615H7.5C7.25136 29.0615 7.0129 29.1603 6.83709 29.3361C6.66127 29.5119 6.5625 29.7504 6.5625 29.999C6.5625 30.2477 6.66127 30.4861 6.83709 30.6619C7.0129 30.8377 7.25136 30.9365 7.5 30.9365H16.25C16.4986 30.9365 16.7371 30.8377 16.9129 30.6619C17.0887 30.4861 17.1875 30.2477 17.1875 29.999C17.1875 29.7504 17.0887 29.5119 16.9129 29.3361C16.7371 29.1603 16.4986 29.0615 16.25 29.0615Z"/>
                            </svg>
                        }
                        

                    </div>
                </div>


            {filteredEntries.length!==0?

                <div className="entrie-tabs-container">
                     <SwipeableList
                        fullSwipe={true}
                        type={ListType.IOS}
                     >
                        { filteredEntries.map((entry, index)=>(
                            <SwipeableListItem
                                key={entry.eid}
                                trailingActions={trailingActions( entry )} 
                                
                            >
                                <EntryTab 
                                    entry={entry}
                                    index={index}
                                    entrySwiperState={entrySwiperState}
                                    setEntrySwiperState={setEntrySwiperState}
                                />

                            </SwipeableListItem>
                        ))
                        }
                     </SwipeableList>
                </div>
                :
                <div className="no-diaries-container">
                    <h2 className="no-diaries">No diaries yet.</h2>
                </div>
            }                

            <ConfirmModal
                title={'Are you sure you want to delete this diary entry?'}
                text={'Deleted diaries are kept in the trash. (Settings > Data > Trash)'}
                rightText={'Delete'} 
                leftText={'Cancel'}
                confirmAction={sendEntrytoTrash}
                isActive={confirmModal}
                setIsActive={setConfirmModal}
            />
            
            </motion.div>


            
            <EntrySwiper
                entries={filteredEntries} 
                entrySwiperState={entrySwiperState}
                setEntrySwiperState={setEntrySwiperState}
            />
            
        </>
    )

}
