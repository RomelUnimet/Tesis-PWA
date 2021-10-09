import React ,{ useEffect, useRef, useState } from 'react'
import '../../scss/profile/profile.scss'

import { motion } from "framer-motion"
import { TopBarProfile } from '../ui/TopBarProfile'
import { useDispatch, useSelector } from 'react-redux'
//import { ProfileAllLocations } from './ProfileAllLocations'
//import { ProfileAllTags } from './ProfileAllTags'
//import { ProfileAllPhotos } from './ProfileAllPhotos'
//import { ProfileAllWeathers } from './ProfileAllWeathers'
import { useLastLocation } from 'react-router-last-location'
import { useLocation } from 'react-router'
import { storeLastProfilePath } from '../../actions/navigation'


export const ProfileScreen = ( /*{ ceModalState }*/ ) => {

    
    const {settings} = useSelector(state => state.settings)

    const {entries} = useSelector(state => state.entries)
    const filteredEntries = entries.filter( e => e.trash===false)

    //const [userSettings] = settings;
    /*
    const getAllImgs = ()=> {
        let a = filteredEntries.map(e => e.photos)
        let b = []
        a.forEach(e => {
            b.push(...e)
        });
        return b
    }
    */

    //const allImg = getAllImgs() //Pudiesemos aplicar algo de guarar el resultado de la funcion y eso

    //const allWeathers =  filteredEntries.map( e => e.weather )

    /*
    const orderedComponents = userSettings.order.map(comp => {
        switch (comp) {
            case "photos": 
                return <ProfileAllPhotos key={'photos'} allImg={allImg} />
            case "tags": 
                return <ProfileAllTags key={'tags'}/>
             
            case "locations": 
                return  <div key={'locations'}></div> //{ !ceModalState && <ProfileAllLocations key={'locations'}}/>
            
            default:
                return <ProfileAllWeathers key={'weather'} allWeathers={allWeathers} />
            
        }
    });
    */

    const ref = useRef()

    //const [visible, setvisible] = useState(false)
/*
    const helpVisibility =  () => {

        if(ref.current.scrollTop>=120){
            //setvisible(true)
            //console.log(ref.current.scrollTop)
        }else{
            //setvisible(false)
            //console.log(ref.current.scrollTop)
        }

    }*/

    const lastLocation = useLastLocation();
       
    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname==='/settings'){
        
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
        
    }, [])

    //Navigation 
    const dispatch = useDispatch()

    const {pathname} = useLocation();

    useEffect(() => {
        dispatch( storeLastProfilePath(pathname) )
    }, [dispatch, pathname])

   
    
    
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            
            ref={ref}
            className="profile-screen-container"
            //onScroll={helpVisibility}
        >
            <div className="profile-overflow-y">
                <TopBarProfile 
                    diaryName={settings.name} 
                    visible={false} 
                    setvariants={setvariants} 
                />

                <div className="profile-container">
                    <div className="profile-picture-container"
                        style={{backgroundImage: `url(${settings.photo})`}}
                    >
                        { settings.photo!=="" &&
                            <svg viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.5455 0H1.45455C0.65 0 0 0.670312 0 1.5V40.5C0 41.3297 0.65 42 1.45455 42H30.5455C31.35 42 32 41.3297 32 40.5V1.5C32 0.670312 31.35 0 30.5455 0ZM18.7273 3.375H23.0909V13.2141L20.9773 11.625L18.7273 13.2844V3.375ZM28.7273 38.625H3.27273V3.375H16V17.2922C16 17.4469 16.0455 17.6016 16.1364 17.7281C16.1915 17.8086 16.2617 17.8769 16.3426 17.9293C16.4236 17.9816 16.5138 18.0168 16.6081 18.033C16.7024 18.0491 16.7988 18.0458 16.8918 18.0232C16.9848 18.0007 17.0726 17.9593 17.15 17.9016L20.9591 15.0938L24.6591 17.8781C24.7818 17.9719 24.9318 18.0234 25.0864 18.0234C25.4864 18.0234 25.8136 17.6859 25.8136 17.2734V3.375H28.7227V38.625H28.7273Z" />
                            </svg>
                        }
                    </div>
                    <div className="profile-data-container">
                        <h1>{settings.name===""? settings.name : 'Diary Name' }</h1>
                        <h3>{settings.description===""? settings.description : `Today's Talk`}</h3>
                        <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.8103 0.310196C25.909 0.211249 26.0263 0.132746 26.1554 0.079182C26.2844 0.0256183 26.4228 -0.00195313 26.5626 -0.00195312C26.7023 -0.00195312 26.8407 0.0256183 26.9698 0.079182C27.0989 0.132746 27.2161 0.211249 27.3148 0.310196L33.6898 6.6852C33.7888 6.78389 33.8673 6.90114 33.9208 7.03022C33.9744 7.15931 34.002 7.29769 34.002 7.43745C34.002 7.5772 33.9744 7.71558 33.9208 7.84467C33.8673 7.97375 33.7888 8.091 33.6898 8.1897L12.4398 29.4397C12.3379 29.541 12.2164 29.6205 12.0828 29.6734L1.45783 33.9234C1.26474 34.0007 1.05322 34.0197 0.84948 33.9779C0.645743 33.9361 0.458751 33.8354 0.311688 33.6883C0.164624 33.5413 0.0639553 33.3543 0.0221619 33.1505C-0.0196314 32.9468 -0.000711481 32.7353 0.0765762 32.5422L4.32658 21.9172C4.37955 21.7836 4.45907 21.6622 4.56033 21.5602L25.8103 0.310196ZM23.815 5.31245L28.6876 10.1851L31.4352 7.43745L26.5626 2.56482L23.815 5.31245ZM27.1852 11.6874L22.3126 6.81482L8.50008 20.6273V21.2499H9.56258C9.84437 21.2499 10.1146 21.3619 10.3139 21.5611C10.5131 21.7604 10.6251 22.0307 10.6251 22.3124V23.3749H11.6876C11.9694 23.3749 12.2396 23.4869 12.4389 23.6861C12.6381 23.8854 12.7501 24.1557 12.7501 24.4374V25.4999H13.3727L27.1852 11.6874ZM6.44308 22.6843L6.21783 22.9096L2.97083 31.0292L11.0905 27.7822L11.3157 27.5569C11.113 27.4812 10.9383 27.3454 10.8149 27.1677C10.6915 26.99 10.6252 26.7788 10.6251 26.5624V25.4999H9.56258C9.28078 25.4999 9.01053 25.388 8.81128 25.1887C8.61202 24.9895 8.50008 24.7192 8.50008 24.4374V23.3749H7.43758C7.22121 23.3748 7.01005 23.3086 6.83233 23.1852C6.65461 23.0617 6.51881 22.887 6.44308 22.6843Z" />
                        </svg>
                    </div>
                    
                </div>

                <div className="profile-all-diaries-container">
                    <h2> <b>{filteredEntries.length}</b> </h2>
                    <h4> All Diaries </h4>
                </div>    

                { /*orderedComponents */}
            </div>
        </motion.div>
    )
    
}
