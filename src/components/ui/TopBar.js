import React from 'react'
import '../../scss/ui/topbar.scss'
import { WeatherFilter } from '../compHelper/WeatherFilter';

export const TopBar = ({navigateCard, cardModalState, setCardModalState}) => {

    const todayDate = new Date();

    const dateText = () =>{
        
        let shortMonthName = todayDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        return `${shortMonthName}, ${todayDate.getDate()} / ${todayDate.getFullYear()}`
    }

    const slideToToday = () => {
        setCardModalState({
            ...cardModalState,
            year: todayDate.getFullYear(),
        })

        navigateCard(todayDate.getMonth())
    }

    return (
        <div className="topbar-container">
            <div className="topbar-container-layout">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="search-svg"
                >
                    <path d="M32.625 31.0342L24.129 22.5382C26.1706 20.0872 27.1887 16.9434 26.9714 13.7608C26.7542 10.5783 25.3184 7.60201 22.9626 5.45115C20.6068 3.30029 17.5125 2.14046 14.3234 2.21292C11.1343 2.28538 8.09584 3.58457 5.84021 5.84021C3.58457 8.09584 2.28538 11.1343 2.21292 14.3234C2.14046 17.5125 3.30029 20.6068 5.45115 22.9626C7.60201 25.3184 10.5783 26.7542 13.7608 26.9714C16.9434 27.1887 20.0872 26.1706 22.5382 24.129L31.0342 32.625L32.625 31.0342ZM4.49995 14.6249C4.49995 12.6224 5.09377 10.6648 6.20632 8.9998C7.31887 7.33475 8.90018 6.037 10.7503 5.27067C12.6004 4.50433 14.6362 4.30382 16.6002 4.6945C18.5643 5.08517 20.3684 6.04948 21.7844 7.46549C23.2004 8.8815 24.1647 10.6856 24.5554 12.6497C24.9461 14.6137 24.7456 16.6495 23.9792 18.4996C23.2129 20.3497 21.9151 21.931 20.2501 23.0436C18.5851 24.1561 16.6275 24.75 14.6249 24.75C11.9405 24.747 9.36694 23.6793 7.46878 21.7811C5.57062 19.883 4.50292 17.3094 4.49995 14.6249Z"/>
                </svg>


                <div className="date-weather-container"
                    onClick={slideToToday}
                >
                    <WeatherFilter
                        selectedWeather={'none'}
                        style={{height: '1.4rem',fontSize: '1.4rem', fill: '#B6B6B6', marginRight: '0.5rem'}}
                    
                    />
                    <p>{dateText()}</p>
                </div>
            </div>


        </div>
    )


}
