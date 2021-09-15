import React from 'react'
import '../../scss/cards/entry-tab.scss'
import { WeatherFilter } from '../compHelper/WeatherFilter';

export const EntryTab = ( {entry} ) => {

            
    const { photos, date, title, text, weather} = entry;
    
    const dates = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ]

    let bImgStyles;

    if(photos.length!==0){
        const [thumbnailPhoto] = photos.filter((photo)=> photo?.thumbnail===true)

        bImgStyles = {
            backgroundImage: `url(${thumbnailPhoto.photo})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',   
        }
    }
    

    return (
        
            <div className="entry-tab-container">

                {!(date.getDay()===6 || date.getDay()===0)?

                    <div className="entry-tab-date-day">
                        <h1> { date.getDate() } </h1>
                        <h4> { dates[date.getDay()] } </h4>
                        {
                            weather!=='none'?

                            <WeatherFilter
                                selectedWeather={weather}
                                style={{height: '2rem',fontSize: '2rem', fill: '#B6B6B6', marginTop: '0.3rem'}}
                            
                            />
                            :
                            <></>
                        }
                    </div>

                    :

                    <div className="entry-tab-date-day"
                        style={date.getDay()===6? {color:'#0085FF'}: {color:'#FF007A'}}
                    >
                        <h1> { date.getDate() } </h1>
                        <h4> { dates[date.getDay()] } </h4>
                        {
                            weather!=='none'?

                            <WeatherFilter
                                selectedWeather={weather}
                                style={{height: '2rem',fontSize: '2rem', fill: '#B6B6B6', marginTop: '0.3rem'}}
                            
                            />
                            :
                            <></>
                        }
                    </div>
                }
                
                {
                    photos.length!==0?

                    <div className="entry-tab-content" 
                    style={bImgStyles}
                    >
                    </div>
                    :
                    <div className="entry-tab-content">
                        <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{top:'12px', left: '12px' }}
                            className="quotes-rotate"
                        >
                            <path d="M30.4688 24.375C28.7814 24.375 27.132 23.8747 25.729 22.9372C24.3261 21.9998 23.2326 20.6674 22.5869 19.1085C21.9412 17.5496 21.7722 15.8343 22.1014 14.1794C22.4306 12.5245 23.2431 11.0044 24.4363 9.81125C25.6294 8.61813 27.1495 7.80561 28.8044 7.47643C30.4593 7.14725 32.1746 7.3162 33.7335 7.96191C35.2924 8.60762 36.6248 9.70109 37.5622 11.104C38.4997 12.507 39 14.1564 39 15.8438L39.039 17.0625C39.039 19.3032 38.5977 21.5219 37.7402 23.592C36.8827 25.6622 35.6259 27.5431 34.0415 29.1275C32.4571 30.7119 30.5762 31.9687 28.506 32.8262C26.4359 33.6837 24.2172 34.125 21.9765 34.125V29.25C23.5777 29.2543 25.1639 28.9411 26.6433 28.3286C28.1227 27.7161 29.466 26.8164 30.5955 25.6815C31.0345 25.2433 31.4395 24.7723 31.8069 24.2726C31.3643 24.3422 30.9169 24.3772 30.4688 24.3774V24.375ZM8.53125 24.375C6.84393 24.375 5.1945 23.8747 3.79155 22.9372C2.38859 21.9998 1.29512 20.6674 0.649407 19.1085C0.00369652 17.5496 -0.165251 15.8343 0.163929 14.1794C0.49311 12.5245 1.30563 11.0044 2.49875 9.81125C3.69187 8.61813 5.21199 7.80561 6.86689 7.47643C8.52179 7.14725 10.2371 7.3162 11.796 7.96191C13.3549 8.60762 14.6873 9.70109 15.6247 11.104C16.5622 12.507 17.0625 14.1564 17.0625 15.8438L17.1015 17.0625C17.1015 21.5878 15.3039 25.9277 12.104 29.1275C8.90417 32.3274 4.56426 34.125 0.0390038 34.125V29.25C1.64019 29.2543 3.22635 28.9411 4.70576 28.3286C6.18517 27.7161 7.52847 26.8164 8.658 25.6815C9.09701 25.2433 9.50199 24.7723 9.86944 24.2726C9.42677 24.3422 8.97936 24.3772 8.53125 24.3774V24.375Z" fill="#B0B0B0"/>
                        </svg>
                        <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                            style={{bottom:'12px', right: '12px'}}
                        >
                            <path d="M30.4688 24.375C28.7814 24.375 27.132 23.8747 25.729 22.9372C24.3261 21.9998 23.2326 20.6674 22.5869 19.1085C21.9412 17.5496 21.7722 15.8343 22.1014 14.1794C22.4306 12.5245 23.2431 11.0044 24.4363 9.81125C25.6294 8.61813 27.1495 7.80561 28.8044 7.47643C30.4593 7.14725 32.1746 7.3162 33.7335 7.96191C35.2924 8.60762 36.6248 9.70109 37.5622 11.104C38.4997 12.507 39 14.1564 39 15.8438L39.039 17.0625C39.039 19.3032 38.5977 21.5219 37.7402 23.592C36.8827 25.6622 35.6259 27.5431 34.0415 29.1275C32.4571 30.7119 30.5762 31.9687 28.506 32.8262C26.4359 33.6837 24.2172 34.125 21.9765 34.125V29.25C23.5777 29.2543 25.1639 28.9411 26.6433 28.3286C28.1227 27.7161 29.466 26.8164 30.5955 25.6815C31.0345 25.2433 31.4395 24.7723 31.8069 24.2726C31.3643 24.3422 30.9169 24.3772 30.4688 24.3774V24.375ZM8.53125 24.375C6.84393 24.375 5.1945 23.8747 3.79155 22.9372C2.38859 21.9998 1.29512 20.6674 0.649407 19.1085C0.00369652 17.5496 -0.165251 15.8343 0.163929 14.1794C0.49311 12.5245 1.30563 11.0044 2.49875 9.81125C3.69187 8.61813 5.21199 7.80561 6.86689 7.47643C8.52179 7.14725 10.2371 7.3162 11.796 7.96191C13.3549 8.60762 14.6873 9.70109 15.6247 11.104C16.5622 12.507 17.0625 14.1564 17.0625 15.8438L17.1015 17.0625C17.1015 21.5878 15.3039 25.9277 12.104 29.1275C8.90417 32.3274 4.56426 34.125 0.0390038 34.125V29.25C1.64019 29.2543 3.22635 28.9411 4.70576 28.3286C6.18517 27.7161 7.52847 26.8164 8.658 25.6815C9.09701 25.2433 9.50199 24.7723 9.86944 24.2726C9.42677 24.3422 8.97936 24.3772 8.53125 24.3774V24.375Z" fill="#B0B0B0"/>
                        </svg>
                    
                        <h2 style={(title!=='' && text!=='')? {marginBottom:'0.4rem'}:{}}
                        >
                            {title}
                        </h2>
                        <p>{text}</p>
                    
                    </div>
                }
            </div>
        
    )
}
