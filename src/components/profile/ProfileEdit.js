import React, { useRef, useState } from 'react'
import '../../scss/profile/edit-profile.scss'
import { useHistory } from 'react-router'
import { motion } from "framer-motion"
import {  useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

import {
    sortableContainer,
    sortableElement,
    sortableHandle,
  } from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import { useNavAnimation } from '../../hooks/navAnimationHook'
import { updateSettings } from '../../actions/settings'

export const ProfileEdit = () => {

    const dispatch = useDispatch()

    const {settings} = useSelector(state => state.settings)

    const [order, setOrder] = useState(settings[0].order)

    const [ formValues, handleInputChange ] = useForm({
        diaryName: settings[0].name,
        description: settings[0].description
    })

    const { diaryName, description } = formValues;

    //IMAGE
    const [diaryImg, setdiaryImg] = useState(settings[0].photo)

    const fileInput = useRef(null);

    const changePhoto = ( e ) => {

        e.preventDefault();

        if(!!fileInput.current?.files[0]) {

            const reader = new FileReader();
            reader.readAsDataURL(fileInput.current?.files[0])
            
            reader.onload = () => {

                setdiaryImg(reader.result)
            };
        
        }
        //FUNCIONA PERO NO SE SI ES DEMASIADO GRANDE   
    }


    //Navigation 
    const history = useHistory()

    const [variants] = useNavAnimation('profile')

    const goBack = ()=> {

        const updatedSettings = {
            ...settings[0],
            name: diaryName,
            description: description,
            photo : diaryImg,
            order : order,
        }
        

        if(diaryName!==settings[0].name || description!==settings[0].description || diaryImg!==settings[0].photo || order!==settings[0].order){

            dispatch( updateSettings(updatedSettings) )

        }

        history.push('/profile')
    }

    //Sortable
    const onSortEnd = ({oldIndex, newIndex}) => {
        let aux = arrayMoveImmutable(order, oldIndex, newIndex)
        setOrder([...aux]);
    };

    const onSortOver = () => {
        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(100);
        } else {
            console.log('vibrar')
        }
    }

    //HAY QUE BUSCAR UNA MANERA DE HACER QUE NO PUEDAN SUBIR MAS DE UN CIERTO PUNTO
    //Definicion de los componentes del sortable
    const SortableItem = sortableElement(({element, index}) => {
    return(
        <div className="order-profile-tab">
            <h3> {element} </h3>
            <DragHandle/>
        </div>
      )});
      
    const SortableContainer = sortableContainer(({children}) => {
        return <ul>{children}</ul>;
    });

    const DragHandle = sortableHandle(() => (
        <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="profile-editor-drag-handle"
              style={{stroke:'none'}}
        >
            <path d="M35 10.9375H0V8.75H35V10.9375ZM35 28.4375H0V26.25H35V28.4375ZM35 19.67H0V17.5H35V19.67Z" />
        </svg>
    ))

    return (
        <motion.div
            className="profile-edit-container"
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{type:'tween'}}
        >
            <div className="top-bar-left-center">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={goBack}
                >
                    <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z"/>
                </svg>
                <h1> My Tab - Setting </h1>
            </div>

            <div className="spacing-div">

                <div className="edit-profile-tab">
                    <h2> DIARY PHOTO </h2>

                    <label>
                        <input type="file" id="cardPhotoInput" onChange={changePhoto} ref={fileInput} accept="image/*"/>
                                        
                        <div className="profile-edit-picture-container"
                            style={{backgroundImage: `url(${diaryImg})`}}
                        >
                            <svg viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={diaryImg===""? {} : {display:'none'}}
                            >
                                <path d="M30.5455 0H1.45455C0.65 0 0 0.670312 0 1.5V40.5C0 41.3297 0.65 42 1.45455 42H30.5455C31.35 42 32 41.3297 32 40.5V1.5C32 0.670312 31.35 0 30.5455 0ZM18.7273 3.375H23.0909V13.2141L20.9773 11.625L18.7273 13.2844V3.375ZM28.7273 38.625H3.27273V3.375H16V17.2922C16 17.4469 16.0455 17.6016 16.1364 17.7281C16.1915 17.8086 16.2617 17.8769 16.3426 17.9293C16.4236 17.9816 16.5138 18.0168 16.6081 18.033C16.7024 18.0491 16.7988 18.0458 16.8918 18.0232C16.9848 18.0007 17.0726 17.9593 17.15 17.9016L20.9591 15.0938L24.6591 17.8781C24.7818 17.9719 24.9318 18.0234 25.0864 18.0234C25.4864 18.0234 25.8136 17.6859 25.8136 17.2734V3.375H28.7227V38.625H28.7273Z" />
                            </svg>
                        
                        </div>

                    </label>

                </div>

                <div className="edit-profile-tab">
                    <h2> DIARY NAME </h2>
                    <input 
                        type="text" 
                        name="diaryName"
                        value={ diaryName }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="edit-profile-tab">
                    <h2> TODAY'S TALK </h2>
                    <textarea 
                        type="text" 
                        name="description"
                        value={ description }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="edit-profile-tab">
                    <h2> Order </h2>
                    <hr/>
                    <SortableContainer  
                        onSortEnd={onSortEnd} 
                        useDragHandle 
                        helperClass="sortableHelper" 
                        lockAxis={'y'}
                        onSortOver={onSortOver}
                    >
                        {
                            order.map((element, index)=>(
                                <SortableItem key={`item-${index}`} element={element} index={index} />
                            ))
                        }
                    </SortableContainer>
                </div>
            </div>

            
        </motion.div>
    )
}
