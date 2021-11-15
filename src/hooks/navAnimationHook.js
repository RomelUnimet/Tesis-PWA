import { useState, useEffect } from 'react';
import { useLocation } from 'react-router'
import { useLastLocation } from 'react-router-last-location'
import { useDispatch, useSelector } from 'react-redux'
import { storeLastCardPath, storeLastProfilePath } from '../actions/navigation'


export const useNavAnimation = ( prevPathname = '', initialState = {} ) => {
    

    const lastLocation = useLastLocation();

    const SCREEN_WIDTH = window.innerWidth;

    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname.includes(prevPathname)){ 

            //CASO ESPECIAL PARA LA NAVEGACION DE SETTINGS
            if(lastLocation?.pathname.includes('/profile/settings/')){
                return {
                    initial:{x:0, transition:{duration:0} },
                    in:{x:0, transition:{duration:0} },
                    out:{x:0, transition:{duration:0} }
                    }
            }

            return  {
                    initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
                    in:{x:0},
                    out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
                    }
        }else {
            return  {
                    initial:{x:0, transition:{duration:0} },
                    in:{x:0, transition:{duration:0} },
                    out:{x:0, transition:{duration:0} }
                    }
        }
    })

    useEffect(() => {
        setvariants({
            initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
            in:{x:0},
            out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
        })
        
    }, [SCREEN_WIDTH])

    const dispatch = useDispatch()

    const {pathname} = useLocation();

    useEffect(() => {
        if(pathname.includes('profile')){   
            dispatch( storeLastProfilePath(pathname) )
        } else if(pathname.includes('card')){
            dispatch( storeLastCardPath(pathname) ) 
        }

    }, [dispatch, pathname])

    const {navigatingTo} = useSelector(state => state.navigation)

    useEffect(() => {

        if(!navigatingTo.includes(prevPathname) && navigatingTo!=='' ){ 
            setvariants({
                initial:{x:0,opacity:1, transition:{duration:0} },
                in:{x:0, opacity:1, transition:{duration:0} },
                out:{x:0, opacity:0, transition:{duration:0} }
            })
        }

    }, [navigatingTo, prevPathname])

    return [ variants, setvariants ];

}