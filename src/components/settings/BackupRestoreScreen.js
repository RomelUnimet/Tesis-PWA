import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { useNavAnimation } from '../../hooks/navAnimationHook'
import { useHistory } from 'react-router'
import DatePicker from 'react-mobile-datepicker';
import { getBackupData } from '../../helpers/backup-restore-data';
import Localbase from "localbase";
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType
  } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { restoreFromBackupFile } from '../../actions/extra';



const db = new Localbase('pwa-card-diary');

export const BackupRestoreScreen = () => {

    const [variants] = useNavAnimation('profile')

    const history = useHistory()

    const {cards} = useSelector(state => state.cards)

    const [backUps, setbackUps] = useState([])

    const monthMap = {
        '1': 'Jan',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Apr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Aug',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };

    const dateConfig = {
        'date': {
            format: 'DD',
            caption: 'Day',
            step: 1,
        },
        'month': {
            format: value => monthMap[value.getMonth() + 1],
            caption: 'Month',
            step: 1,
        },
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
    };


    const [startDayPicker, setstartDayPicker] = useState({
        isOpen: false,
        time: new Date(2020,0,1)
        
    })
    const [endDayPicker, setendDayPicker] = useState({
        isOpen: false,
        time: new Date()
        
    })

    const dispatch = useDispatch()

    const fileInput = useRef();

    const handleClickStart = () => {
        setstartDayPicker({...startDayPicker, isOpen: true });
    }
 
    const handleCancelStart = () => {
        setstartDayPicker({...startDayPicker, isOpen: false });
    }
 
    const handleSelectStart = (time) => {
        setstartDayPicker({ time, isOpen: false });
    }
    const handleClickEnd = () => {
        setendDayPicker({...endDayPicker, isOpen: true });
    }
 
    const handleCancelEnd = () => {
        setendDayPicker({...endDayPicker, isOpen: false });
    }
 
    const handleSelectEnd = (time) => {
        setendDayPicker({ time, isOpen: false });
    }

    const createBackupData = async () => {

        const dataToShare = await getBackupData( startDayPicker.time, endDayPicker.time );

        shareBackupFile(dataToShare);

        await getBackupDataFromIndexedDB()

    }

    const shareBackupFile = async (backUpData) => {

        const fileName = `${backUpData.backupName}.text`

        const json = JSON.stringify(backUpData)

        const blob = new Blob([json], {type:"text/plain"})

        const href = await URL.createObjectURL(blob);
        
        const file = new File([blob], fileName, {type: "text/plain"})
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: 'PWA CardDiary Share Backup File',
            })
            .then(() => {
                console.log("Share was successful.")
                //alert("Share was successful")
                
            
            })
            .catch((error) =>{ 

                console.error(error)
                /*
                const link = document.createElement('a');
                link.href = href;
                link.download = backUpData.backupName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                */
            });
        } else {
            let link = document.createElement('a');
            link.href = href;
            link.download = backUpData.backupName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    
    }

    //SWIPE TO DELETE
    const trailingActions = ( backUP ) => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            style={{backgroundColor: 'red'}}
            onClick={()=>{
                db.collection('backUpData').doc({ backId: backUP.backId }).delete()
            }}
          >
              <div className="entry-delete-swipe">
                    Delete
              </div>

          </SwipeAction>
        </TrailingActions>
    );

    const getBackupDataFromIndexedDB = async () => {
        const data = await db.collection('backUpData').get();

        setbackUps([...data])
    }

    const writeDateSize = (data) => {

        const jsonSizeMB = new TextEncoder().encode(JSON.stringify(data)).length/(1024*1024)

        const formatedDate = `${data.dateCreated.getFullYear()}.${data.dateCreated.getMonth()+1}.${data.dateCreated.getDate()} / ${data.dateCreated.getHours()}:${data.dateCreated.getMinutes()} / ${jsonSizeMB.toFixed(2)} MB`
        return formatedDate
    }

    const inputJsonBackUp = () => {
        
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(fileInput.current?.files[0]);
        
        function onReaderLoad(event){
            const backupFileJson = JSON.parse(event.target.result);
            
            dispatch( restoreFromBackupFile(backupFileJson, cards[0].uid) )

        }
    
    }

    useEffect(() => {

        async function fetchData () {

            await getBackupDataFromIndexedDB();

        }

        fetchData()
        
    }, [])


    return (
        <motion.div
            style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:2, backgroundColor:'white', overflowY:'auto'}} 
            variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{type:'tween'}}
        >
            <div className="top-bar-left-center">
            <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={()=>{history.goBack()}}
                     style={{transform: 'rotate(90deg)'}}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.625C21.348 2.625 21.6819 2.76328 21.928 3.00942C22.1742 3.25556 22.3124 3.5894 22.3124 3.9375V34.8941L30.5707 26.6332C30.8171 26.3868 31.1514 26.2483 31.4999 26.2483C31.8485 26.2483 32.1827 26.3868 32.4292 26.6332C32.6756 26.8797 32.8141 27.214 32.8141 27.5625C32.8141 27.911 32.6756 28.2453 32.4292 28.4918L21.9292 38.9918C21.8073 39.114 21.6624 39.211 21.503 39.2771C21.3435 39.3433 21.1726 39.3773 20.9999 39.3773C20.8273 39.3773 20.6564 39.3433 20.4969 39.2771C20.3375 39.211 20.1926 39.114 20.0707 38.9918L9.5707 28.4918C9.32425 28.2453 9.18579 27.911 9.18579 27.5625C9.18579 27.214 9.32425 26.8797 9.5707 26.6332C9.81715 26.3868 10.1514 26.2483 10.4999 26.2483C10.8485 26.2483 11.1827 26.3868 11.4292 26.6332L19.6874 34.8941V3.9375C19.6874 3.5894 19.8257 3.25556 20.0719 3.00942C20.318 2.76328 20.6519 2.625 20.9999 2.625V2.625Z"/>
                </svg>
                
                <h1> Backup / Restore </h1>
            </div>

            <div className="spacing-div-sections">

                    <div className="padding-div-br">

                        <div className="b-r-section-container">

                            <h2>BACKUP</h2>

                            <p>
                                The export file will be creater in Card Diary PWA. 
                                Therefore, you need to back it up to other places. 
                                We recommend sending it yo storage services on the Cloud.
                            </p>

                            <div className="select-date-container"
                                    
                                >
                                    <h3>Start day</h3>

                                    <button 
                                        onClick={handleClickStart}
                                        className="time-picker-btn"
                                        >
                                            <p>{`${startDayPicker.time.getFullYear()}.${startDayPicker.time.getMonth()+1}.${startDayPicker.time.getDate()} `}</p>
                                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                    </button>
                                                    
                                                    
                                    <DatePicker //Tengo que separar este componente //Esto puedo cambiarlo cuando yo quiera ya que es diferente en cada interfaz
                                        value={startDayPicker.time}
                                        isOpen={startDayPicker.isOpen}
                                        dateConfig={dateConfig}
                                        onSelect={handleSelectStart}
                                        onCancel={handleCancelStart}
                                        theme={'ios'}
                                        min={new Date(2020,0,1)}
                                        max={new Date(2023,0,1)}
                                        confirmText={'Done'}
                                        cancelText={'Close'} 
                                    />
                                </div>

                                <hr/>

                            <div className="select-date-container"
                                    
                                >
                                    <h3>End day</h3>

                                    <button 
                                        onClick={handleClickEnd}
                                        className="time-picker-btn"
                                        >
                                            <p>{`${endDayPicker.time.getFullYear()}.${endDayPicker.time.getMonth()+1}.${endDayPicker.time.getDate()} `}</p>
                                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                    </button>
                                                    
                                                    
                                    <DatePicker //Tengo que separar este componente //Esto puedo cambiarlo cuando yo quiera ya que es diferente en cada interfaz
                                        value={endDayPicker.time}
                                        isOpen={endDayPicker.isOpen}
                                        dateConfig={dateConfig}
                                        onSelect={handleSelectEnd}
                                        onCancel={handleCancelEnd}
                                        theme={'ios'}
                                        min={new Date(2020,0,1)}
                                        max={new Date(2023,0,1)}
                                        confirmText={'Done'}
                                        cancelText={'Close'} 
                                    />
                                </div>

                                <hr/>

                            <button className="b-r-button-blue" onClick={createBackupData}>
                                Create backup file
                            </button>

                            <div className="backup-files-container">

                                
                            <hr style={{margin:'0px'}} />
                                <SwipeableList
                                    fullSwipe={true}
                                    type={ListType.IOS}
                                >

                                {
                                    backUps.map((backUP, index)=>(

                                        <SwipeableListItem
                                            trailingActions={trailingActions( backUP )} 
                                            key={index}
                                        >
                                                <div className="backup-file"
                                                     onClick={()=>{shareBackupFile(backUP)}}
                                                >
                                                    <div className="backup-name-data">
                                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18.166 21.4229C17.4336 21.4229 17.01 22.1184 17.01 23.0464C17.01 23.9828 17.4506 24.6415 18.1717 24.6415C18.9041 24.6415 19.322 23.9474 19.322 23.018C19.322 22.1624 18.9098 21.4229 18.166 21.4229V21.4229Z" fill="#545454"/>
                                                            <path d="M19.8334 2.83325H8.50008C7.74863 2.83325 7.02796 3.13176 6.49661 3.66312C5.96526 4.19447 5.66675 4.91514 5.66675 5.66659V28.3333C5.66675 29.0847 5.96526 29.8054 6.49661 30.3367C7.02796 30.8681 7.74863 31.1666 8.50008 31.1666H25.5001C26.2515 31.1666 26.9722 30.8681 27.5035 30.3367C28.0349 29.8054 28.3334 29.0847 28.3334 28.3333V11.3333L19.8334 2.83325ZM11.3646 23.6639C11.3646 25.0253 10.7115 25.4999 9.66458 25.4999C9.41525 25.4999 9.08941 25.4588 8.8755 25.3866L8.99733 24.5153C9.14466 24.5649 9.33591 24.6003 9.55125 24.6003C10.0032 24.6003 10.2879 24.3949 10.2879 23.6512V20.645H11.366V23.6639H11.3646ZM13.4315 25.4928C12.8861 25.4928 12.3463 25.3512 12.0786 25.2024L12.2982 24.3085C12.5872 24.4573 13.0362 24.6074 13.4967 24.6074C13.9925 24.6074 14.2532 24.4006 14.2532 24.0903C14.2532 23.7914 14.0279 23.6214 13.4542 23.416C12.658 23.1398 12.1409 22.6992 12.1409 22.005C12.1409 21.189 12.8223 20.5643 13.95 20.5643C14.4883 20.5643 14.8836 20.6776 15.1697 20.8065L14.9261 21.6778C14.7348 21.5857 14.3948 21.4511 13.9273 21.4511C13.4598 21.4511 13.2317 21.6636 13.2317 21.9115C13.2317 22.2161 13.5009 22.3521 14.12 22.5858C14.9643 22.8975 15.361 23.3367 15.361 24.011C15.3624 24.8128 14.7433 25.4928 13.4315 25.4928ZM18.115 25.4999C16.6969 25.4999 15.8682 24.4303 15.8682 23.0689C15.8682 21.6353 16.7833 20.5643 18.1943 20.5643C19.6606 20.5643 20.4624 21.6636 20.4624 22.9825C20.461 24.5508 19.5118 25.4999 18.115 25.4999V25.4999ZM25.1232 25.422H23.9871L22.9657 23.5775C22.6601 23.0304 22.3835 22.4677 22.1369 21.8917L22.1142 21.8988C22.144 22.5292 22.1582 23.2035 22.1582 23.9841V25.4234H21.1651V20.645H22.4273L23.4204 22.396C23.7037 22.8975 23.9871 23.4939 24.2024 24.0323H24.2222C24.1514 23.4018 24.1302 22.7573 24.1302 22.0404V20.645H25.1247V25.422H25.1232ZM19.8334 12.7499H18.4167V5.66659L25.5001 12.7499H19.8334Z" fill="#545454"/>
                                                        </svg>

                                                        <div>

                                                            <h3> {backUP.backupName}.json</h3>
                                                            <p> {writeDateSize(backUP)} </p>

                                                        </div>

                                                    </div>

                                                    <svg className="arrow-b-r" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>

                                                </div>                                                
                                        </SwipeableListItem>
                                    ))
                                }
                                </SwipeableList>




                            </div>




                        </div>

                        <hr/>

                        <div className="b-r-section-container" style={{marginBottom:'10rem'}}>

                            <h2>Restore</h2>

                            <p>
                                Backup file type only supports JSON format. txt or PDF not supported.
                            </p>

                            

                            <label>
                                <input type="file" id="cardPhotoInput" onChange={inputJsonBackUp} ref={fileInput} accept="application/json"/>
                                <div className="b-r-button-blue input-div">
                                    Import Carddiary Backup file (.json)
                                </div>
                            </label>
                        </div>

                    </div>
            </div>

        </motion.div>
    )
}
