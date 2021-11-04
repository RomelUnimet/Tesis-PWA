import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useNavAnimation } from '../../hooks/navAnimationHook'
import { useHistory } from 'react-router'
import DatePicker from 'react-mobile-datepicker';


export const BackupRestoreScreen = () => {

    const [variants] = useNavAnimation('profile')

    const history = useHistory()

    const [startDayPicker, setstartDayPicker] = useState({
        isOpen: false,
        time: new Date(2020,0,1)
        
    })
    const [endDayPicker, setendDayPicker] = useState({
        isOpen: false,
        time: new Date()
        
    })

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



    return (
        <motion.div
            style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:2, backgroundColor:'white'}} 
            variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{type:'tween'}}
        >
            <div className="top-bar-left-center">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={()=>{history.push('/profile/settings')}}
                >
                    <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z"/>
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
                                        onSelect={handleSelectStart}
                                        onCancel={handleCancelStart}
                                        theme={'ios'}
                                        showHeader={true}
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
                                        onSelect={handleSelectEnd}
                                        onCancel={handleCancelEnd}
                                        theme={'ios'}
                                        showHeader={true}
                                        min={new Date(2020,0,1)}
                                        max={new Date(2023,0,1)}
                                        confirmText={'Done'}
                                        cancelText={'Close'} 
                                    />
                                </div>

                                <hr/>

                            <button className="b-r-button-blue">
                                Create backup file
                            </button>

                            <div className="backup-files-container">

                                <hr/>

                                <div className="backup-file">
                                    <div className="backup-name-data">
                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.166 21.4229C17.4336 21.4229 17.01 22.1184 17.01 23.0464C17.01 23.9828 17.4506 24.6415 18.1717 24.6415C18.9041 24.6415 19.322 23.9474 19.322 23.018C19.322 22.1624 18.9098 21.4229 18.166 21.4229V21.4229Z" fill="#545454"/>
                                            <path d="M19.8334 2.83325H8.50008C7.74863 2.83325 7.02796 3.13176 6.49661 3.66312C5.96526 4.19447 5.66675 4.91514 5.66675 5.66659V28.3333C5.66675 29.0847 5.96526 29.8054 6.49661 30.3367C7.02796 30.8681 7.74863 31.1666 8.50008 31.1666H25.5001C26.2515 31.1666 26.9722 30.8681 27.5035 30.3367C28.0349 29.8054 28.3334 29.0847 28.3334 28.3333V11.3333L19.8334 2.83325ZM11.3646 23.6639C11.3646 25.0253 10.7115 25.4999 9.66458 25.4999C9.41525 25.4999 9.08941 25.4588 8.8755 25.3866L8.99733 24.5153C9.14466 24.5649 9.33591 24.6003 9.55125 24.6003C10.0032 24.6003 10.2879 24.3949 10.2879 23.6512V20.645H11.366V23.6639H11.3646ZM13.4315 25.4928C12.8861 25.4928 12.3463 25.3512 12.0786 25.2024L12.2982 24.3085C12.5872 24.4573 13.0362 24.6074 13.4967 24.6074C13.9925 24.6074 14.2532 24.4006 14.2532 24.0903C14.2532 23.7914 14.0279 23.6214 13.4542 23.416C12.658 23.1398 12.1409 22.6992 12.1409 22.005C12.1409 21.189 12.8223 20.5643 13.95 20.5643C14.4883 20.5643 14.8836 20.6776 15.1697 20.8065L14.9261 21.6778C14.7348 21.5857 14.3948 21.4511 13.9273 21.4511C13.4598 21.4511 13.2317 21.6636 13.2317 21.9115C13.2317 22.2161 13.5009 22.3521 14.12 22.5858C14.9643 22.8975 15.361 23.3367 15.361 24.011C15.3624 24.8128 14.7433 25.4928 13.4315 25.4928ZM18.115 25.4999C16.6969 25.4999 15.8682 24.4303 15.8682 23.0689C15.8682 21.6353 16.7833 20.5643 18.1943 20.5643C19.6606 20.5643 20.4624 21.6636 20.4624 22.9825C20.461 24.5508 19.5118 25.4999 18.115 25.4999V25.4999ZM25.1232 25.422H23.9871L22.9657 23.5775C22.6601 23.0304 22.3835 22.4677 22.1369 21.8917L22.1142 21.8988C22.144 22.5292 22.1582 23.2035 22.1582 23.9841V25.4234H21.1651V20.645H22.4273L23.4204 22.396C23.7037 22.8975 23.9871 23.4939 24.2024 24.0323H24.2222C24.1514 23.4018 24.1302 22.7573 24.1302 22.0404V20.645H25.1247V25.422H25.1232ZM19.8334 12.7499H18.4167V5.66659L25.5001 12.7499H19.8334Z" fill="#545454"/>
                                        </svg>

                                        <div>

                                            <h3>CardDiary-YYYY.MM.DD-YYYY.MM.DD.json</h3>
                                            <p> YYYY.MM.DD / HH:MM / WEIGHT MB </p>

                                        </div>

                                    </div>

                                    <svg className="arrow-b-r" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                </div>
                                <hr/>

                            </div>




                        </div>

                        <hr/>

                        <div className="b-r-section-container">

                            <h2>Restore</h2>

                            <p>
                                Backup file type only supports JSON format. tct or PDF not supported.
                            </p>

                            <button className="b-r-button-blue">
                                Import Carddiary Backup dile (.json)
                            </button>
                        </div>

                    </div>
            </div>

        </motion.div>
    )
}
