import React, { useCallback, useEffect, useState } from 'react'
import '../../scss/modals/ceModal.scss'
import { LocHandleCE } from '../create_entry/LocHandleCE';
import { TagHandleCE } from '../create_entry/TagHandleCE';
import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { WiDaySunny, WiDayCloudy, WiCloud, WiRain, WiSnow,  WiThunderstorm, WiCloudyGusts, WiCloudyWindy, WiDust, WiTornado, WiSnowflakeCold } from "react-icons/wi";
import { useSelector } from 'react-redux';

export const CEModal = ({modalState, setModalState, selectedWeather, setSelectedWeather, tagsCE, setTagsCE, locationCE, setLocationCE}) => {

    const iconStyles = { fontSize:'2.4rem', height:'2.4rem', width:'2.4rem', fill:'#757575', transition: 'ease-in-out', transitionDuration: '0.2s'} 
    const iconStylesSmall = { fontSize:'2rem', height:'2rem', width:'2.4rem', fill:'#757575', transition: 'ease-in-out', transitionDuration: '0.2s' }

    const iconStylesSelected = { fontSize:'2.4rem', height:'2.4rem', width:'2.4rem', fill:'#3CDAFD', transition: 'ease-in-out', transitionDuration: '0.2s' } 
    const iconStylesSmallSelected = { fontSize:'2rem', height:'2rem', width:'2.4rem', fill:'#3CDAFD', transition: 'ease-in-out', transitionDuration: '0.2s' }
    
    const closeModal = () =>{

        animateClose()
        setTimeout(() => {
            setModalState({
                ...modalState,
                show:false,
            })
        }, 200);
        
    }

    const selectWeather = (weather) =>{
        setSelectedWeather(weather)
    }

    const [tagState, setTagState] = useState({
        show:false,
        tags:[],
    })

    const [locationState, setLocationState] = useState({
        show:false,
        locations:[],
    })
    
    const {locations} = useSelector(state => state.locations)
    const {tags} = useSelector(state => state.tags);

    const filteredTags = tags.filter( (tag)=> tagsCE.includes(tag.tid) )
    const filteredLocations = locations.filter( (location)=> locationCE.includes(location.lid) )

    const tagsString = filteredTags.map((tag)=>tag.name).join(', ')

    // GESTURE / ANIMATION

    const SCREEN_HEIGHT = window.innerHeight;

    const [{ y }, api] = useSpring(() => ({ y: SCREEN_HEIGHT }));
    const height = 330;

    
    const open = useCallback(() => {
        api.start({ y: 0, immediate: false, config: config.default })
    }, [api] )
    
    const close = () => {
        animateClose()
        setTimeout(() => {
            closeModal();
        }, 200);
    }

    const bindModal = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], canceled }) => {
          if (my < -90) close()
    
          if (last) {
            my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled })
          }
          else api.start({ y: my, immediate: true })
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: false }
      )

    const animateClose = () => {
        api.start({ y: SCREEN_HEIGHT, immediate: false, config:config.default })
    } 

    useEffect(() => {
        if(modalState.show){      
            open()
        }
    }, [modalState,open])
   


    return (
        <>
            <div className="modal-container-ce"
                    onClick={closeModal}
                    style={ modalState.show? { display:'inline' } : { display:'none' }}
                >
                    
            </div>

            {modalState.show?
               <animated.div className="modal-ce" style={{y: y, touchAction: 'none'}} {...bindModal()}
               >
                   <div className="wheather-container" >
   
                           <WiDaySunny style={selectedWeather==='sunny'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('sunny')} 
                           />
                           <WiDayCloudy style={selectedWeather==='cloudy'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('cloudy')}
                           />
                           <WiCloud style={selectedWeather==='cloud'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('cloud')}
                           />
                           <WiRain style={selectedWeather==='rain'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('rain')}
                           />
                           <WiSnow style={selectedWeather==='haze'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('haze')}
                           />
                           <WiThunderstorm style={selectedWeather==='thunder'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('thunder')}
                           />
                           <WiCloudyGusts style={selectedWeather==='cloudy-gust'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('cloudy-gust')}
                           />
                           <WiCloudyWindy style={selectedWeather==='cloudy-windy'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('cloudy-windy')}
                           />
                           <WiDust style={selectedWeather==='dusty'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('dusty')}
                           />
                           <WiTornado style={selectedWeather==='tornado'? iconStylesSmallSelected : iconStylesSmall} 
                               onClick={()=>selectWeather('tornado')}
                           />
                           <WiSnowflakeCold style={selectedWeather==='snow'? iconStylesSelected : iconStyles} 
                               onClick={()=>selectWeather('snow')}
                           />
                           <svg  viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 className={selectedWeather==='none'? "icon-styles-none-selected" : "icon-styles-none"}
                                 onClick={()=>selectWeather('none')}
                           >
                               <rect x="3" y="3" width="94" height="94" rx="20"  strokeWidth="6"/>
                               <path d="M31.6816 61H27.873L20.459 48.8379V61H16.6504V42.5156H20.459L27.8857 54.7031V42.5156H31.6816V61ZM50.1914 52.1768C50.1914 53.9964 49.8698 55.5918 49.2266 56.9629C48.5833 58.334 47.6608 59.3919 46.459 60.1367C45.2656 60.8815 43.8945 61.2539 42.3457 61.2539C40.8138 61.2539 39.4469 60.8857 38.2451 60.1494C37.0433 59.4131 36.1123 58.3636 35.4521 57.001C34.792 55.6299 34.4577 54.0557 34.4492 52.2783V51.3643C34.4492 49.5446 34.7751 47.945 35.4268 46.5654C36.0869 45.1774 37.0137 44.1152 38.207 43.3789C39.4089 42.6341 40.7799 42.2617 42.3203 42.2617C43.8607 42.2617 45.2275 42.6341 46.4209 43.3789C47.6227 44.1152 48.5495 45.1774 49.2012 46.5654C49.8613 47.945 50.1914 49.5404 50.1914 51.3516V52.1768ZM46.332 51.3389C46.332 49.4007 45.985 47.9281 45.291 46.9209C44.597 45.9137 43.6068 45.4102 42.3203 45.4102C41.0423 45.4102 40.0563 45.9095 39.3623 46.9082C38.6683 47.8984 38.3171 49.3542 38.3086 51.2754V52.1768C38.3086 54.0641 38.6556 55.5283 39.3496 56.5693C40.0436 57.6104 41.0423 58.1309 42.3457 58.1309C43.6237 58.1309 44.6055 57.6315 45.291 56.6328C45.9766 55.6257 46.3236 54.1615 46.332 52.2402V51.3389ZM67.9902 61H64.1816L56.7676 48.8379V61H52.959V42.5156H56.7676L64.1943 54.7031V42.5156H67.9902V61ZM82.4375 52.9893H75.125V57.9404H83.707V61H71.3164V42.5156H83.6816V45.6006H75.125V50.0059H82.4375V52.9893Z" />
                           </svg>
                   </div>
   
                       <hr></hr>
   
                   <div className="tag-location-container" 
                           onClick={()=>{setTagState({...tagState, show:true})}}
                       >
                           <h3>Tag</h3>
                           <div className="item-names">
                               <p> {tagsString} </p>
                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                           </div>
                   </div>
   
                       <hr></hr>
   
                   <div className="tag-location-container" style={{marginBottom: '2rem'}}
                           onClick={()=>{setLocationState({...locationState, show:true})}}
                       >
                           <h3>Location</h3>
                           
                           <div className="item-names">
                                <p> {filteredLocations[0]?.name} </p>
                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                           </div>
                   </div>
               </animated.div>

                :
                <></>
        
            }
            {
                tagState.show &&
                <TagHandleCE
                    handlerState={tagState}
                    setHandlerState={setTagState}
                    tagsCE={tagsCE}
                    setTagsCE={setTagsCE}
                />
            }
            {
                locationState.show &&
                <LocHandleCE
                    handlerState={locationState}
                    setHandlerState={setLocationState}
                    locationCE={locationCE}
                    setLocationCE={setLocationCE}
                />
            }
        </>
    )

    
}
