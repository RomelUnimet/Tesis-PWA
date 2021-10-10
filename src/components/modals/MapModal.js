import React, { useCallback, useRef, useState } from 'react'
import '../../scss/modals/mapModal.scss'

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

const libraries = ["places"]

export const MapModal = ({mapModalState, setMapModalState, addLocation, updateData={lid:'', latitude:0, longitude:0, name:'', description:'', update:false}, setUpdateData}) => {

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    const [mapInputValue, setMapInputValue] = useState(updateData.name)

    const [showSearch, setShowSearch] = useState(false)

    //Maps

    const {geolocation} = useSelector(state => state.geolocation)

    const [center] = useState(updateData.lid===''? {...geolocation} :{ lat: updateData.latitude, lng: updateData.longitude} )

    const [mapCurrentAddress, setMapCurrentAddress] = useState(updateData.description)

    const options = {
        disableDefaultUI: true
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
        libraries,
    });
    
    /*
    const setCoordinatesCenter = useCallback( 
        
        async () => {

            await navigator.geolocation.getCurrentPosition( async (position) => {
                if(!updateData.update){
                    setCenter({
                        ...center,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                }
            })
        },
        [center, updateData.update],
    )
    */

    const reverseGeocoding = useCallback(
        async () => {
            if(isLoaded){

                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRef.current?.getCenter().lat()},${mapRef.current?.getCenter().lng()}&key=${process.env.REACT_APP_MAP_API_KEY}`;
                        
                fetch(url)
                    .then(response => response.json())
                        .then(data => {
                        
                            setMapCurrentAddress(data.results[1].formatted_address)
                    
                        })
                    .catch(err => console.warn(err.message));
            }
        },
        [isLoaded],
    )
    const panTo = useCallback(({ lat, lng})=> {
        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(17);
        reverseGeocoding()
    }, [reverseGeocoding])

    

    const mapRef = useRef(null);

    const onMapLoad = useCallback((map)=> {
        mapRef.current = map;
        reverseGeocoding()
        
    }, [reverseGeocoding]);


    /*
    useEffect(() => {

        setCoordinatesCenter() 
        
    }, [setCoordinatesCenter, reverseGeocoding, updateData])
    */
   

    const handleAdd = () => {

        if(mapInputValue!==''){
            addLocation(
                        mapInputValue, 
                        mapCurrentAddress, 
                        mapRef.current?.getCenter().lat().toString(), 
                        mapRef.current?.getCenter().lng().toString()
                        )
        }else {
            console.log('El location debe tener un nombre')
        }

        if(updateData.update){
            setTimeout(() => {
                setUpdateData({
                    ...updateData,
                    update:false
                })
            }, 200);
        }
    }

    const goToLocation = () => {
        mapRef.current?.panTo(center)
        mapRef.current?.setZoom(17);
    }
    return ( 
       
        <motion.div 
            className="map-modal-container"
            initial={{x:0, y: SCREEN_HEIGHT }}
            animate={{x:0, y: 0 }}
            exit={{x:0, y: SCREEN_HEIGHT }}
            transition={{duration:0.3}}  
        >
            <div className="mm-topbar">
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={()=>{
                            setMapModalState(!mapModalState)
                            if(updateData.update){

                                setTimeout(() => {
                                    setUpdateData({
                                        ...updateData,
                                        update:false
                                    })
                                }, 200);
                                
                            }
                        }}
                    >
                        <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44732 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" fill="#3D3D3D"/>
                    </svg>  

                <h1>New location</h1>

                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    onClick={()=>{
                            handleAdd()
                            setMapInputValue('')
                        }}
                >
                    <path d="M5.33325 16L13.3333 24L26.6666 8" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="mm-bottombar">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={goToLocation}
                >
                    <path d="M28.704 17.6H20.8V14.4H28.704C28.3494 11.5787 27.0655 8.95578 25.0549 6.94513C23.0442 4.93448 20.4213 3.65057 17.6 3.296V11.2H14.4V3.296C11.5787 3.65057 8.95578 4.93448 6.94513 6.94513C4.93448 8.95578 3.65057 11.5787 3.296 14.4H11.2V17.6H3.296C3.65057 20.4213 4.93448 23.0442 6.94513 25.0549C8.95578 27.0655 11.5787 28.3494 14.4 28.704V20.8H17.6V28.704C20.4213 28.3494 23.0442 27.0655 25.0549 25.0549C27.0655 23.0442 28.3494 20.4213 28.704 17.6V17.6ZM16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32Z" fill="#545454"/>
                </svg>

                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>{setShowSearch(true)}}
                >
                    <path d="M32.625 31.0342L24.129 22.5382C26.1706 20.0872 27.1887 16.9434 26.9714 13.7608C26.7542 10.5783 25.3184 7.60201 22.9626 5.45115C20.6068 3.30029 17.5125 2.14046 14.3234 2.21292C11.1343 2.28538 8.09584 3.58457 5.84021 5.84021C3.58457 8.09584 2.28538 11.1343 2.21292 14.3234C2.14046 17.5125 3.30029 20.6068 5.45115 22.9626C7.60201 25.3184 10.5783 26.7542 13.7608 26.9714C16.9434 27.1887 20.0872 26.1706 22.5382 24.129L31.0342 32.625L32.625 31.0342ZM4.49995 14.6249C4.49995 12.6224 5.09377 10.6648 6.20632 8.9998C7.31887 7.33475 8.90018 6.037 10.7503 5.27067C12.6004 4.50433 14.6362 4.30382 16.6002 4.6945C18.5643 5.08517 20.3684 6.04948 21.7844 7.46549C23.2004 8.8815 24.1647 10.6856 24.5554 12.6497C24.9461 14.6137 24.7456 16.6495 23.9792 18.4996C23.2129 20.3497 21.9151 21.931 20.2501 23.0436C18.5851 24.1561 16.6275 24.75 14.6249 24.75C11.9405 24.747 9.36694 23.6793 7.46878 21.7811C5.57062 19.883 4.50292 17.3094 4.49995 14.6249Z" fill="#545454"/>
                </svg>

            
            </div> 

            {
                isLoaded?
                <div>
                    <AnimatePresence>
                        {
                            showSearch &&
                            
                            <motion.div 
                                className="location-search-component" 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{opacity: 0 }}
                                transition={{duration:0.3}}
                            >
                                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{left:0}}>
                                    <path d="M32.625 31.0342L24.129 22.5382C26.1706 20.0872 27.1887 16.9434 26.9714 13.7608C26.7542 10.5783 25.3184 7.60201 22.9626 5.45115C20.6068 3.30029 17.5125 2.14046 14.3234 2.21292C11.1343 2.28538 8.09584 3.58457 5.84021 5.84021C3.58457 8.09584 2.28538 11.1343 2.21292 14.3234C2.14046 17.5125 3.30029 20.6068 5.45115 22.9626C7.60201 25.3184 10.5783 26.7542 13.7608 26.9714C16.9434 27.1887 20.0872 26.1706 22.5382 24.129L31.0342 32.625L32.625 31.0342ZM4.49995 14.6249C4.49995 12.6224 5.09377 10.6648 6.20632 8.9998C7.31887 7.33475 8.90018 6.037 10.7503 5.27067C12.6004 4.50433 14.6362 4.30382 16.6002 4.6945C18.5643 5.08517 20.3684 6.04948 21.7844 7.46549C23.2004 8.8815 24.1647 10.6856 24.5554 12.6497C24.9461 14.6137 24.7456 16.6495 23.9792 18.4996C23.2129 20.3497 21.9151 21.931 20.2501 23.0436C18.5851 24.1561 16.6275 24.75 14.6249 24.75C11.9405 24.747 9.36694 23.6793 7.46878 21.7811C5.57062 19.883 4.50292 17.3094 4.49995 14.6249Z" fill="#545454"/>
                                </svg>
                                <Search 
                                    panTo={panTo}  
                                    setShowSearch={setShowSearch} 
                                    setMapInputValue={setMapInputValue} 
                                />
                                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{right:0}}
                                    className="filled-close"
                                    onClick={()=>{setShowSearch(false)}}
                                >
                                    <path d="M17 0C7.6263 0 0 7.6263 0 17C0 26.3737 7.6263 34 17 34C26.3737 34 34 26.3737 34 17C34 7.6263 26.3737 0 17 0ZM23.1551 21.3064C23.2817 21.4266 23.3829 21.571 23.4528 21.7309C23.5226 21.8909 23.5598 22.0632 23.562 22.2377C23.5643 22.4122 23.5315 22.5854 23.4658 22.7471C23.4 22.9088 23.3025 23.0557 23.1791 23.1791C23.0557 23.3025 22.9088 23.4 22.7471 23.4658C22.5854 23.5315 22.4122 23.5643 22.2377 23.562C22.0632 23.5598 21.8909 23.5226 21.7309 23.4528C21.571 23.3829 21.4266 23.2817 21.3064 23.1551L17 18.8496L12.6936 23.1551C12.4464 23.39 12.1172 23.519 11.7762 23.5147C11.4352 23.5103 11.1094 23.3729 10.8682 23.1318C10.6271 22.8906 10.4897 22.5648 10.4853 22.2238C10.481 21.8828 10.61 21.5536 10.8449 21.3064L15.1504 17L10.8449 12.6936C10.61 12.4464 10.481 12.1172 10.4853 11.7762C10.4897 11.4352 10.6271 11.1094 10.8682 10.8682C11.1094 10.6271 11.4352 10.4897 11.7762 10.4853C12.1172 10.481 12.4464 10.61 12.6936 10.8449L17 15.1504L21.3064 10.8449C21.5536 10.61 21.8828 10.481 22.2238 10.4853C22.5648 10.4897 22.8906 10.6271 23.1318 10.8682C23.3729 11.1094 23.5103 11.4352 23.5147 11.7762C23.519 12.1172 23.39 12.4464 23.1551 12.6936L18.8496 17L23.1551 21.3064Z" fill="#545454"/>
                                </svg>
                            </motion.div>
        
                        }
                    </AnimatePresence>

                    <GoogleMap
                        mapContainerClassName="map-container"
                        zoom= {16}
                        center= {center}
                        options = {options}
                        onLoad={onMapLoad}
                        onDragEnd={reverseGeocoding}
                        clickableIcons={false}
                    >
                        <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className='center-marker-map'
                        >
                            <path d="M17.5 2.1875C14.3103 2.19126 11.2523 3.46005 8.99679 5.71553C6.74131 7.97101 5.47253 11.029 5.46876 14.2188C5.46494 16.8254 6.3164 19.3613 7.89251 21.4375C7.89251 21.4375 8.22064 21.8695 8.27423 21.9319L17.5 32.8125L26.7302 21.9264C26.7783 21.8684 27.1075 21.4375 27.1075 21.4375L27.1086 21.4342C28.6839 19.359 29.535 16.8242 29.5313 14.2188C29.5275 11.029 28.2587 7.97101 26.0032 5.71553C23.7478 3.46005 20.6897 2.19126 17.5 2.1875ZM17.5 18.5938C16.6347 18.5938 15.7889 18.3372 15.0694 17.8564C14.3499 17.3757 13.7892 16.6924 13.458 15.893C13.1269 15.0936 13.0403 14.2139 13.2091 13.3652C13.3779 12.5166 13.7946 11.737 14.4064 11.1252C15.0183 10.5133 15.7978 10.0966 16.6465 9.92781C17.4952 9.759 18.3748 9.84564 19.1743 10.1768C19.9737 10.5079 20.657 11.0687 21.1377 11.7881C21.6184 12.5076 21.875 13.3535 21.875 14.2188C21.8736 15.3786 21.4122 16.4906 20.592 17.3107C19.7718 18.1309 18.6599 18.5923 17.5 18.5938Z" />
                        </svg>

                        <div className="map-input-direction-container">
                            <input
                                type="text" 
                                placeholder="Type location name"
                                value={mapInputValue}
                                onChange={event => setMapInputValue(event.target.value)}
                            />
                            <p>
                                { mapCurrentAddress }
                            </p>
                        </div>
                    </GoogleMap>
                    <div className="search-location-container">

                    </div>
                </div>
                :
                <></>
            }

        </motion.div>
    )
    
}

function Search( {panTo, setShowSearch, setMapInputValue} ) {
    const { ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutocomplete()

    return (
        
                    
            <Combobox onSelect={ async (address) =>{

                        setMapInputValue(address)
                        clearSuggestions()

                        try {
                            const results= await getGeocode({address})
                            const { lat, lng } = await getLatLng(results[0])
                            panTo({lat, lng})
                            setShowSearch(false)
                        } catch (error) {
                            console.log(error)
                        }
                    
                    }
                }
            >
                <ComboboxInput
                    value={value}
                    onChange={(e)=>{
                            setValue(e.target.value)
                            }}
                    disabled={!ready}
                    placeholder="Type your addres or location name"
                />
                    <ComboboxList>
                        { status==='OK' && data.map(({ description}) => (

                            <ComboboxOption key={ description } value={ description } className="search-results"/>

                        ))}
                    </ComboboxList>
            </Combobox>
    )
}
