import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../scss/profile/profile.scss'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


export const ProfileAllLocations = ( {ceModalState} ) => {

    //HACER QUE NO SALGA CUANDO SE ABRA EL CE MODAL

    const {locations} = useSelector(state => state.locations)

    const {geolocation} = useSelector(state => state.geolocation)


    const [center, setcenter] = useState({...geolocation[0]})

    useEffect(() => {

        if(locations.length!==0){

            const latitudes = locations.map((l)=>parseFloat(l.latitude))
            const longitudes = locations.map((l)=>parseFloat(l.longitude))
            //Maps
            let maxLat = Math.max(...latitudes);
            let minLat = Math.min(...latitudes);
            let maxLng = Math.max(...longitudes);
            let minLng = Math.min(...longitudes);

            setcenter ({lat: (maxLat-((maxLat-minLat)/2)), lng: (maxLng-((maxLng-minLng)/2)) })

        }
    }, [locations])

    const options = {
        disableDefaultUI: true
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    });

    const mapRef = useRef()

    const onMapLoad = useCallback((map)=> {
        mapRef.current = map; 
    }, []);


    return (
        <div className="profile-all-locations-container">
            <div className="profile-all-topbar">

                <h3>Location</h3>

                <div className="number-arrow-container">

                    <h4> {locations.length} </h4>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
            </div>

            { isLoaded && !ceModalState &&

                <GoogleMap
                    mapContainerClassName="all-location-map"
                    zoom= {1}
                    center= {center}
                    options = {options}
                    clickableIcons={false}
                    onLoad={onMapLoad}
                    
                >          
                    {locations.map((loc, index)=>(
                        <Marker 
                            key={index} 
                            position={{lat: parseFloat(loc.latitude), lng: parseFloat(loc.longitude)}} 
                            icon={{
                                path: "M17.5 2.1875C14.3103 2.19126 11.2523 3.46005 8.99679 5.71553C6.74131 7.97101 5.47253 11.029 5.46876 14.2188C5.46494 16.8254 6.3164 19.3613 7.89251 21.4375C7.89251 21.4375 8.22064 21.8695 8.27423 21.9319L17.5 32.8125L26.7302 21.9264C26.7783 21.8684 27.1075 21.4375 27.1075 21.4375L27.1086 21.4342C28.6839 19.359 29.535 16.8242 29.5313 14.2188C29.5275 11.029 28.2587 7.97101 26.0032 5.71553C23.7478 3.46005 20.6897 2.19126 17.5 2.1875ZM17.5 18.5938C16.6347 18.5938 15.7889 18.3372 15.0694 17.8564C14.3499 17.3757 13.7892 16.6924 13.458 15.893C13.1269 15.0936 13.0403 14.2139 13.2091 13.3652C13.3779 12.5166 13.7946 11.737 14.4064 11.1252C15.0183 10.5133 15.7978 10.0966 16.6465 9.92781C17.4952 9.759 18.3748 9.84564 19.1743 10.1768C19.9737 10.5079 20.657 11.0687 21.1377 11.7881C21.6184 12.5076 21.875 13.3535 21.875 14.2188C21.8736 15.3786 21.4122 16.4906 20.592 17.3107C19.7718 18.1309 18.6599 18.5923 17.5 18.5938Z",
                                fillColor: "black",
                                fillOpacity: 1,
                                scale: 1,
                                strokeColor: "white",
                                strokeWeight: 2,
                                strokeOpacity:0.5,
                              }}

                              
                        />
                    ))}
                </GoogleMap>
            }
        </div>
    )
}
