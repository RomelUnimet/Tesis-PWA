import React, { useRef } from 'react'
import '../../scss/entries/entry.scss'
import {EntryImgGallery} from './EntryImgGallery'
import {WeatherFilter} from '../compHelper/WeatherFilter'
import { useSelector } from 'react-redux'

import useDoubleClick from 'use-double-click';

export const Entry = ({entry, fullscreen, setfullscreen, setEditModalState, swiperRef}) => {

    const { photos, date, title, text, weather, location, tags} = entry;

    const dateToText = () =>{
        
        let shortMonthName = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        let shortDayName = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
        return `${shortDayName}. ${shortMonthName} ${date.getDate()} / ${date.getFullYear()}`
    }

    const {locations} = useSelector(state => state.locations)

    const [entryLocation] = locations.filter( (loc)=> location===loc.lid)

    const {tags: e_tag} = useSelector(state => state.tags)

    const entryTags = e_tag.filter((tag)=> tags.includes(tag.tid))

    const tagsString = entryTags.map((tag)=>tag.name).join(', ')

    const entryRef = useRef()
    

    useDoubleClick({
        onDoubleClick: () => {
            if(!fullscreen){
                setEditModalState(true)
            }
        },
        ref: entryRef,
        latency: 250
    });

    return (
        <div className="detailed-entry-container swiper-lazy"
             ref={entryRef}
        >
            {
                photos.length!==0 &&
                    <EntryImgGallery
                        images={photos}
                        fullscreen={fullscreen}
                        setfullscreen={setfullscreen}
                        prevswiperRef={swiperRef}
                    />
            }

            <div style={photos.length!==0? {marginTop:'42vh'}:{}}>
                { title!=="" &&
                    <h1
                        style={photos.length!==0? {marginTop:'1.6rem'} : {marginTop:'4rem'}}
                    > 
                        {title} 
                    </h1>
                }

                <h4
                    style={title!==""? {marginTop:'0.5rem'} : (photos.length!==0? {marginTop:'2rem'}: {marginTop:'4rem'})}
                > 
                    {dateToText()} 
                </h4>

                { weather!=='none' &&

                    <div>
                        <WeatherFilter
                            selectedWeather={weather}
                            style={{height: '2.4rem',fontSize: '2.4rem', fill: '#404040', marginTop: '0.8rem'}}
                            
                        />
                    </div>
                }

                <p> 
                    {text} 
                </p>

                { tags.length!==0 && location!=='' &&
                    <div className="entry-tag-loc-container" >
                        { tags.length!==0 &&
                            <div className="entry-tag-loc-label">
                                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.875 4.25C31.875 3.68641 31.6511 3.14591 31.2526 2.7474C30.8541 2.34888 30.3136 2.125 29.75 2.125L20.0048 2.125C19.4412 2.12512 18.9008 2.34908 18.5024 2.74762L3.62737 17.6226C3.229 18.0211 3.0052 18.5615 3.0052 19.125C3.0052 19.6885 3.229 20.2289 3.62737 20.6274L13.3726 30.3726C13.7711 30.771 14.3115 30.9948 14.875 30.9948C15.4385 30.9948 15.9789 30.771 16.3774 30.3726L31.2524 15.4976C31.6509 15.0992 31.8749 14.5588 31.875 13.9952L31.875 4.25ZM24.4375 12.75C23.5921 12.75 22.7814 12.4142 22.1836 11.8164C21.5858 11.2186 21.25 10.4079 21.25 9.5625C21.25 8.71712 21.5858 7.90637 22.1836 7.3086C22.7814 6.71082 23.5921 6.375 24.4375 6.375C25.2829 6.375 26.0936 6.71082 26.6914 7.3086C27.2892 7.90637 27.625 8.71712 27.625 9.5625C27.625 10.4079 27.2892 11.2186 26.6914 11.8164C26.0936 12.4142 25.2829 12.75 24.4375 12.75Z"/>
                                </svg>

                                <label>{tagsString}</label>
                            </div>
                        }
                        { location!=='' &&
                            <div className="entry-tag-loc-label">
                                <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 2.1875C14.3103 2.19126 11.2523 3.46005 8.99679 5.71553C6.74131 7.97101 5.47253 11.029 5.46876 14.2188C5.46494 16.8254 6.3164 19.3613 7.89251 21.4375C7.89251 21.4375 8.22064 21.8695 8.27423 21.9319L17.5 32.8125L26.7302 21.9264C26.7783 21.8684 27.1075 21.4375 27.1075 21.4375L27.1086 21.4342C28.6839 19.359 29.535 16.8242 29.5313 14.2188C29.5275 11.029 28.2587 7.97101 26.0032 5.71553C23.7478 3.46005 20.6897 2.19126 17.5 2.1875ZM17.5 18.5938C16.6347 18.5938 15.7889 18.3372 15.0694 17.8564C14.3499 17.3757 13.7892 16.6924 13.458 15.893C13.1269 15.0936 13.0403 14.2139 13.2091 13.3652C13.3779 12.5166 13.7946 11.737 14.4064 11.1252C15.0183 10.5133 15.7978 10.0966 16.6465 9.92781C17.4952 9.759 18.3748 9.84564 19.1743 10.1768C19.9737 10.5079 20.657 11.0687 21.1377 11.7881C21.6184 12.5076 21.875 13.3535 21.875 14.2188C21.8736 15.3786 21.4122 16.4906 20.592 17.3107C19.7718 18.1309 18.6599 18.5923 17.5 18.5938Z"/>
                                </svg>
                                <label>{entryLocation?.name}</label>
                            </div>
                        }
                    </div>
                }
            </div>

        </div>
    )
}
