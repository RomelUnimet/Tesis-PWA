import React, { useRef } from 'react';
import '../../scss/entries/save-entry-img.scss';
import { useSelector } from 'react-redux';

import { WeatherFilter } from '../compHelper/WeatherFilter';

import {toJpeg} from 'html-to-image';

import { motion } from 'framer-motion';


export const EntrySaveAsImg = ({entry, setSaveAsImgModal}) => {

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

    //ANIMATION
    const SCREEN_HEIGHT = window.innerHeight;

    const shareImgRef = useRef()

    /*
    const dataURLtoFile = useCallback(
        (dataurl, filename) => {
            var arr = dataurl.split(","),
              mimeType = arr[0].match(/:(.*?);/)[1],
              decodedData = atob(arr[1]),
              lengthOfDecodedData = decodedData.length,
              u8array = new Uint8Array(lengthOfDecodedData);
            while (lengthOfDecodedData--) {
              u8array[lengthOfDecodedData] = decodedData.charCodeAt(lengthOfDecodedData);
            }
            return new File([u8array], filename, { type: mimeType });
          },
        [],
    )
    */

    const shareFile = (file, title) => {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {

                navigator
                .share({
                    files: [file],
                    title,
                })
                .then(() => {
                    console.log("Share was successful.")                
                })
                    .catch((error) =>{ 
                        console.log("Sharing failed", error)
                        alert("Sharing failed!", error)
                    });
        } else {
          console.log(`Your system doesn't support sharing files.`);
          alert("Your system doesn't support sharing files")
        }
    };

    const shareEntry = () => {
        
        toJpeg(document.getElementById("entry_img"), { quality: 0.95 })
            .then(
            function (dataUrl) {

                const blob = new Blob([dataUrl], {type:"image/jpeg"})
            
                const file = new File([blob], 'entry-share.jpeg', {type: "image/jpeg"})

                shareFile(file, "PWA CD Share Entry",);

            }
            ).catch(function (error) {

                alert('oops, something went wrong!', error);

              });
    };

 

      
    //NO ME DEJA HACER EL TRIGGER DE LA WEB SHARE API AUTOMATICAMENTE
    /*
    useEffect(() => {
        shareCanvas()
    }, [shareCanvas])
    */

    return (

        <motion.div 
            className="detailed-entry-container-save-img"
            initial={{x:0, y: SCREEN_HEIGHT }}
            animate={{x:0, y: 0 }}
            exit={{x:0, y: SCREEN_HEIGHT }}
            transition={{duration:0.3}}
        >
            <div 
            ref={shareImgRef}
            id={'entry_img'}
            className="save-image-container"
            onClick={(e)=>{shareEntry(e)}}
            >
            { title!=="" &&
                <h1
                    style={{marginTop:'2rem'}}
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

                <div style={{marginBottom:'1rem'}}>
                    <WeatherFilter
                        selectedWeather={weather}
                        style={{height: '2.4rem',fontSize: '2.4rem', fill: '#404040', marginTop: '0.8rem'}} 
                    />
                </div>
            }

            {
                photos.length!==0 &&
                    photos.map((img, index)=>(

                        <img 
                            src={img.photo} 
                            key={index} 
                            style={{width:'100%'}}
                            alt="pic"
                        
                        />

                    ))
            }

                
                <div style={{width:'100vw'}}>
                    <p > 
                        {text} 
                    </p>
                </div>

                { tags.length!==0 && location!=='' &&
                    <div className="entry-tag-loc-container" style={{width:'100%'}}>
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

            <div className="save-as-img-icons">
                <svg  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>setSaveAsImgModal(false)}
                >
                    <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44732 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" fill="white"/>
                </svg>
                <svg  viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={(e)=>{shareEntry(e)}}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.6999 11C7.40816 11 7.12838 11.1159 6.92209 11.3222C6.7158 11.5284 6.5999 11.8082 6.5999 12.1V25.3C6.5999 25.5917 6.7158 25.8715 6.92209 26.0778C7.12838 26.2841 7.40816 26.4 7.6999 26.4H25.2999C25.5916 26.4 25.8714 26.2841 26.0777 26.0778C26.284 25.8715 26.3999 25.5917 26.3999 25.3V12.1C26.3999 11.8082 26.284 11.5284 26.0777 11.3222C25.8714 11.1159 25.5916 11 25.2999 11H22.5499C22.2582 11 21.9784 10.8841 21.7721 10.6778C21.5658 10.4715 21.4499 10.1917 21.4499 9.89997C21.4499 9.60823 21.5658 9.32844 21.7721 9.12215C21.9784 8.91586 22.2582 8.79997 22.5499 8.79997H25.2999C26.1751 8.79997 27.0145 9.14765 27.6334 9.76652C28.2522 10.3854 28.5999 11.2248 28.5999 12.1V25.3C28.5999 26.1752 28.2522 27.0146 27.6334 27.6334C27.0145 28.2523 26.1751 28.6 25.2999 28.6H7.6999C6.82469 28.6 5.98532 28.2523 5.36645 27.6334C4.74758 27.0146 4.3999 26.1752 4.3999 25.3V12.1C4.3999 11.2248 4.74758 10.3854 5.36645 9.76652C5.98532 9.14765 6.82469 8.79997 7.6999 8.79997H10.4499C10.7416 8.79997 11.0214 8.91586 11.2277 9.12215C11.434 9.32844 11.5499 9.60823 11.5499 9.89997C11.5499 10.1917 11.434 10.4715 11.2277 10.6778C11.0214 10.8841 10.7416 11 10.4499 11H7.6999ZM15.3999 3.59917L12.2495 6.74957C12.0618 6.92444 11.8136 7.01965 11.5571 7.01512C11.3007 7.01059 11.0559 6.90669 10.8746 6.72531C10.6932 6.54392 10.5893 6.29922 10.5848 6.04274C10.5802 5.78626 10.6754 5.53804 10.8503 5.35037L15.8003 0.400369C15.9859 0.214974 16.2376 0.11084 16.4999 0.11084C16.7623 0.11084 17.0139 0.214974 17.1995 0.400369L22.1495 5.35037C22.3244 5.53804 22.4196 5.78626 22.4151 6.04274C22.4105 6.29922 22.3066 6.54392 22.1252 6.72531C21.9439 6.90669 21.6992 7.01059 21.4427 7.01512C21.1862 7.01965 20.938 6.92444 20.7503 6.74957L17.5999 3.59917V18.7C17.5999 18.9917 17.484 19.2715 17.2777 19.4778C17.0714 19.6841 16.7916 19.8 16.4999 19.8C16.2082 19.8 15.9284 19.6841 15.7221 19.4778C15.5158 19.2715 15.3999 18.9917 15.3999 18.7V3.59917Z" fill="white"/>
                </svg>
            </div>

        </motion.div>
            
    )
}
