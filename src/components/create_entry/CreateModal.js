import React, { useState } from 'react'
import '../../scss/create_entry/create_modal.scss'

import DatePicker from 'react-mobile-datepicker';
import { CEModal } from '../modals/CEModal';
import { WeatherFilter } from '../compHelper/WeatherFilter';
import { useRef } from 'react';
import { ImgCarrousel } from './ImgCarrousel';

import { generateID } from '../../helpers/generateId'
import { useSelector } from 'react-redux';


export const CreateModal = ({CEModalState, setCEModalState}) => {

    
    const [datePickerState, setDatePicker] = useState({
        time: new Date(),
        isOpen: false
    });

    const [modalState, setModalState] = useState({
        weather:'',
        tags:[],
        locations:[],
        show:false,
    })

    const [selectedWeather, setSelectedWeather] = useState('none');

    const handleClick = () => {
        setDatePicker({...datePickerState, isOpen: true });
    }
 
    const handleCancel = () => {
        setDatePicker({...datePickerState, isOpen: false });
    }
 
    const handleSelect = (time) => {
        setDatePicker({ time, isOpen: false });
    }

    const dateText = () =>{
        
        let shortMonthName = datePickerState.time.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        let shortDayName = datePickerState.time.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
        return `${shortDayName}. ${shortMonthName} ${datePickerState.time.getDate()} / ${datePickerState.time.getFullYear()}`
    }

    const openModal= () =>{

        setModalState({
            ...modalState,
            show:true
        })
    }

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const [entryImgState, setEntryImgState] = useState([])

    let auxImgArray=[];

    const [imgInputIsEmpty, setImgInputIsEmpty] = useState(true)

    const imgInput = useRef(null);

    const changeInput = () =>{
        

        if(!!imgInput.current?.files[0] && imgInput.current?.files.length<4 && (imgInput.current?.files.length+entryImgState.length)<=3) {

            
            for (let index = 0; index < imgInput.current?.files.length; index++) {
                auxReader(index);   
            }
           
        }else if(imgInput.current?.files.length>3 && (imgInput.current?.files.length+entryImgState.length)>3){

            //POPUP QUE INDIQUE QUE NO SE PUEDEN SUBIR MAS DE 3 IMAGENES
            console.log('No puedes subir mas de 3 imagenes a una entrada')
        }


    }

    const auxReader = (index) => {
        var reader = new FileReader();
        reader.readAsDataURL(imgInput.current?.files[index])
        reader.onload = () => {
            
                auxImgArray = entryImgState;
                auxImgArray.push({
                    img: reader.result,
                    thumbnail: false
                })

            setEntryImgState(auxImgArray);       
            setImgInputIsEmpty(true)
            setImgInputIsEmpty(false)
            
        };
    }

    const {cards} = useSelector(state => state.cards);
     
    const handleCreateEntry = () => {

        const cardID = cards.filter( (card) => card.month === datePickerState.time.getMonth() && card.year === datePickerState.time.getFullYear())
        const entry = {
            e_id : generateID(), //con funcion
            c_id : cardID[0].cid, //con funcion
            u_id : cardID[0].uid, //con funcion
            photos : entryImgState,
            dateTime : datePickerState.time, //con funcion
            title : title,
            text : text,
            weather : selectedWeather,
            tags : [],
            locations: [],
            trash : false,
        }

        console.log(entry);
    }

    const resetValues = () => {
        setTitle('')
        setText('')
        setSelectedWeather('none')
        setEntryImgState([])
        setImgInputIsEmpty(true)
    }   

    //EVALUAR PASAR LA BARRA DE ARRIBA A OTRO COMPONENTE PARA QUE SEA MAS LIMPIO
    return (
        <div 
            className={ CEModalState? "animate__animated animate__slideInUp create-entry-container" : "animate__animated animate__slideOutDown create-entry-container-close"}
            
        >
            <div className="ce-container">
                <div className="ce-toolbar"
                    
                >
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={()=>{
                            setCEModalState(!CEModalState)
                            setDatePicker({...datePickerState, time: new Date()})
                            resetValues()

                        }}
                        //poner otra vez en la fecha de hoy cuando se renderice 
                    >
                        <path d="M19.41 17.9999L27.7 9.70994C27.8638 9.51864 27.9494 9.27256 27.9397 9.02089C27.93 8.76921 27.8256 8.53047 27.6475 8.35238C27.4694 8.17428 27.2307 8.06995 26.979 8.06023C26.7274 8.05051 26.4813 8.13612 26.29 8.29994L18 16.5899L9.70997 8.28994C9.52167 8.10164 9.26627 7.99585 8.99997 7.99585C8.73367 7.99585 8.47828 8.10164 8.28997 8.28994C8.10167 8.47825 7.99588 8.73364 7.99588 8.99994C7.99588 9.26624 8.10167 9.52164 8.28997 9.70994L16.59 17.9999L8.28997 26.2899C8.18529 26.3796 8.10027 26.4899 8.04025 26.614C7.98022 26.738 7.94649 26.8732 7.94117 27.0109C7.93586 27.1486 7.95906 27.2859 8.00934 27.4143C8.05961 27.5426 8.13587 27.6591 8.23332 27.7566C8.33078 27.854 8.44732 27.9303 8.57565 27.9806C8.70398 28.0309 8.84131 28.0541 8.97903 28.0487C9.11675 28.0434 9.25188 28.0097 9.37594 27.9497C9.50001 27.8896 9.61033 27.8046 9.69997 27.6999L18 19.4099L26.29 27.6999C26.4813 27.8638 26.7274 27.9494 26.979 27.9397C27.2307 27.9299 27.4694 27.8256 27.6475 27.6475C27.8256 27.4694 27.93 27.2307 27.9397 26.979C27.9494 26.7273 27.8638 26.4812 27.7 26.2899L19.41 17.9999Z" fill="#3D3D3D"/>
                    </svg>

                    <button 
                        onClick={handleClick}
                        className="date-picker-btn"
                        >
                            {dateText()} 
                    </button>
                    
                    <DatePicker //Tengo que separar este componente
                        value={datePickerState.time}
                        isOpen={datePickerState.isOpen}
                        onSelect={handleSelect}
                        onCancel={handleCancel}
                        theme={'android'}
                        min={new Date(2020,0,1)}
                        max={new Date(2023,0,1)}
                        showHeader={false}
                        confirmText={'Done'}
                        cancelText={'Close'} //Hay que cambiar el orden de estos botones
                    />

                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        onClick={handleCreateEntry}
                    >
                        <path d="M5.33325 16L13.3333 24L26.6666 8" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>



                {imgInputIsEmpty?
                    <div className="ce-add-images">
                        <label>
                            <input type="file" id="cardPhotoInput" onChange={changeInput} ref={imgInput} accept="image/*" multiple/>
                            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.9999 17H18.9999V6C18.9999 5.73478 18.8946 5.48043 18.707 5.29289C18.5195 5.10536 18.2651 5 17.9999 5C17.7347 5 17.4804 5.10536 17.2928 5.29289C17.1053 5.48043 16.9999 5.73478 16.9999 6V17H5.99992C5.73471 17 5.48035 17.1054 5.29282 17.2929C5.10528 17.4804 4.99992 17.7348 4.99992 18C4.99499 18.13 5.01797 18.2595 5.06732 18.3798C5.11667 18.5001 5.19124 18.6085 5.286 18.6976C5.38076 18.7867 5.49352 18.8544 5.61667 18.8962C5.73983 18.938 5.87051 18.953 5.99992 18.94H16.9999V30C16.9999 30.2652 17.1053 30.5196 17.2928 30.7071C17.4804 30.8946 17.7347 31 17.9999 31C18.2651 31 18.5195 30.8946 18.707 30.7071C18.8946 30.5196 18.9999 30.2652 18.9999 30V19H29.9999C30.2651 19 30.5195 18.8946 30.707 18.7071C30.8946 18.5196 30.9999 18.2652 30.9999 18C30.9999 17.7348 30.8946 17.4804 30.707 17.2929C30.5195 17.1054 30.2651 17 29.9999 17Z"/>
                            </svg>
                        </label>
                    </div>

                    :

                    <ImgCarrousel
                        entryImgState={entryImgState}
                        setEntryImgState={setEntryImgState}
                        setImgInputIsEmpty={setImgInputIsEmpty}
                    />
                }

                

                <div className="input-modal-textarea-container">
                    <input 
                        type="text" 
                        placeholder="Title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <div className="ce-modal-container" 
                        onClick={openModal}
                    >
                        <WeatherFilter
                            selectedWeather={selectedWeather}
                            style={{ fontSize:'2.4rem', height:'2.2rem', width:'2.4rem', fill:'#757575', margin:'0px', marginLeft: '2px', marginRight: '2px'}}
                        />

                        { true?
                            //NO TAG SELECTED
                            <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.875 4.25C31.875 3.68641 31.6511 3.14591 31.2526 2.7474C30.8541 2.34888 30.3136 2.125 29.75 2.125L20.0048 2.125C19.4412 2.12512 18.9008 2.34908 18.5024 2.74762L3.62737 17.6226C3.229 18.0211 3.0052 18.5615 3.0052 19.125C3.0052 19.6885 3.229 20.2289 3.62737 20.6274L13.3726 30.3726C13.7711 30.771 14.3115 30.9948 14.875 30.9948C15.4385 30.9948 15.9789 30.771 16.3774 30.3726L31.2524 15.4976C31.6509 15.0992 31.8749 14.5588 31.875 13.9952L31.875 4.25ZM24.4375 12.75C23.5921 12.75 22.7814 12.4142 22.1836 11.8164C21.5858 11.2186 21.25 10.4079 21.25 9.5625C21.25 8.71712 21.5858 7.90637 22.1836 7.3086C22.7814 6.71082 23.5921 6.375 24.4375 6.375C25.2829 6.375 26.0936 6.71082 26.6914 7.3086C27.2892 7.90637 27.625 8.71712 27.625 9.5625C27.625 10.4079 27.2892 11.2186 26.6914 11.8164C26.0936 12.4142 25.2829 12.75 24.4375 12.75Z"/>
                            </svg>
                            :
                            <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.875 4.25C31.875 3.68641 31.6511 3.14591 31.2526 2.7474C30.8541 2.34888 30.3136 2.125 29.75 2.125L20.0048 2.125C19.4412 2.12512 18.9008 2.34908 18.5024 2.74762L3.62737 17.6226C3.229 18.0211 3.0052 18.5615 3.0052 19.125C3.0052 19.6885 3.229 20.2289 3.62737 20.6274L13.3726 30.3726C13.7711 30.771 14.3115 30.9948 14.875 30.9948C15.4385 30.9948 15.9789 30.771 16.3774 30.3726L31.2524 15.4976C31.6509 15.0992 31.8749 14.5588 31.875 13.9952L31.875 4.25ZM24.4375 12.75C23.5921 12.75 22.7814 12.4142 22.1836 11.8164C21.5858 11.2186 21.25 10.4079 21.25 9.5625C21.25 8.71712 21.5858 7.90637 22.1836 7.3086C22.7814 6.71082 23.5921 6.375 24.4375 6.375C25.2829 6.375 26.0936 6.71082 26.6914 7.3086C27.2892 7.90637 27.625 8.71712 27.625 9.5625C27.625 10.4079 27.2892 11.2186 26.6914 11.8164C26.0936 12.4142 25.2829 12.75 24.4375 12.75Z" fill="#545454"/>
                            </svg>
                        }

                        { true?
                            //NO LOCATION SELECTED
                            <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 2.1875C14.3103 2.19126 11.2523 3.46005 8.99679 5.71553C6.74131 7.97101 5.47253 11.029 5.46876 14.2188C5.46494 16.8254 6.3164 19.3613 7.89251 21.4375C7.89251 21.4375 8.22064 21.8695 8.27423 21.9319L17.5 32.8125L26.7302 21.9264C26.7783 21.8684 27.1075 21.4375 27.1075 21.4375L27.1086 21.4342C28.6839 19.359 29.535 16.8242 29.5313 14.2188C29.5275 11.029 28.2587 7.97101 26.0032 5.71553C23.7478 3.46005 20.6897 2.19126 17.5 2.1875ZM17.5 18.5938C16.6347 18.5938 15.7889 18.3372 15.0694 17.8564C14.3499 17.3757 13.7892 16.6924 13.458 15.893C13.1269 15.0936 13.0403 14.2139 13.2091 13.3652C13.3779 12.5166 13.7946 11.737 14.4064 11.1252C15.0183 10.5133 15.7978 10.0966 16.6465 9.92781C17.4952 9.759 18.3748 9.84564 19.1743 10.1768C19.9737 10.5079 20.657 11.0687 21.1377 11.7881C21.6184 12.5076 21.875 13.3535 21.875 14.2188C21.8736 15.3786 21.4122 16.4906 20.592 17.3107C19.7718 18.1309 18.6599 18.5923 17.5 18.5938Z"/>
                            </svg>
                            :
                            <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 2.1875C14.3103 2.19126 11.2523 3.46005 8.99679 5.71553C6.74131 7.97101 5.47253 11.029 5.46876 14.2188C5.46494 16.8254 6.3164 19.3613 7.89251 21.4375C7.89251 21.4375 8.22064 21.8695 8.27423 21.9319L17.5 32.8125L26.7302 21.9264C26.7783 21.8684 27.1075 21.4375 27.1075 21.4375L27.1086 21.4342C28.6839 19.359 29.535 16.8242 29.5313 14.2188C29.5275 11.029 28.2587 7.97101 26.0032 5.71553C23.7478 3.46005 20.6897 2.19126 17.5 2.1875ZM17.5 18.5938C16.6347 18.5938 15.7889 18.3372 15.0694 17.8564C14.3499 17.3757 13.7892 16.6924 13.458 15.893C13.1269 15.0936 13.0403 14.2139 13.2091 13.3652C13.3779 12.5166 13.7946 11.737 14.4064 11.1252C15.0183 10.5133 15.7978 10.0966 16.6465 9.92781C17.4952 9.759 18.3748 9.84564 19.1743 10.1768C19.9737 10.5079 20.657 11.0687 21.1377 11.7881C21.6184 12.5076 21.875 13.3535 21.875 14.2188C21.8736 15.3786 21.4122 16.4906 20.592 17.3107C19.7718 18.1309 18.6599 18.5923 17.5 18.5938Z" fill="#545454"/>
                            </svg>
                        }
                        

                    </div>

                    <textarea 
                        type="textarea" 
                        placeholder="Write about your day..."
                        value={text}
                        onChange={event => setText(event.target.value)}
                        
                    />
                </div>
            </div>

            <CEModal
                modalState={modalState}
                setModalState={setModalState}
                selectedWeather={selectedWeather} 
                setSelectedWeather={setSelectedWeather}
            />


        </div>
    )

    
}
