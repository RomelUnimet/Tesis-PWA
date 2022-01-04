import React, { useRef, useState } from 'react'
import '../../scss/profile/edit-profile.scss'
import { useHistory } from 'react-router'
import { AnimatePresence, motion } from "framer-motion"
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
import { CropperComponent } from '../ui/CropperComponent'

export const ProfileEdit = () => {

    const dispatch = useDispatch()

    const {userSettings} = useSelector(state => state.userSettings)

    const [order, setOrder] = useState(userSettings[0].order)

    const [cropperState, setCropperState] = useState({
        show: false,
        img: ''
    });

    const [ formValues, handleInputChange ] = useForm({
        diaryName: userSettings[0].name,
        description: userSettings[0].description
    })

    const { diaryName, description } = formValues;

    //IMAGE
    const [diaryImg, setdiaryImg] = useState(userSettings[0].photo)

    const fileInput = useRef(null);

    const changePhoto = ( e ) => {

        e.preventDefault();

        if(!!fileInput.current?.files[0]) {

            const reader = new FileReader();
            reader.readAsDataURL(fileInput.current?.files[0])
            
            reader.onload = () => {

                //setdiaryImg(reader.result)

                setCropperState({
                    ...cropperState,
                    show:true,
                    img: reader.result
                })

            };
        
        }
        //FUNCIONA PERO NO SE SI ES DEMASIADO GRANDE   
    }


    //Navigation 
    const history = useHistory()

    const [variants] = useNavAnimation('profile')

    const goBack = ()=> {

        const updatedSettings = {
            ...userSettings[0],
            name: diaryName,
            description: description,
            photo : diaryImg,
            order : order,
        }

        if(diaryName!==userSettings[0].name || description!==userSettings[0].description || diaryImg!==userSettings[0].photo || order!==userSettings[0].order){
            dispatch( updateSettings(updatedSettings) )
        }

        history.push('/profile')
    }

    //Sortable
    const onSortEnd = ({oldIndex, newIndex}) => {
        let aux = arrayMoveImmutable(order, oldIndex, newIndex)
        setOrder([...aux]);
    };

    const vibrate = () => {
        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(100);
        } else {
            console.log('vibrar')
        }
    }

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

    const [focused, setFocused] = useState(false)
    const onFocus = () => {setFocused(true)}
    const onBlur = () => setFocused(false)

    return (
        <>
        <motion.div
            className="profile-edit-container"
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{type:'tween'}}
            style={ focused? { zIndex:3 } : { }}
        >

            <div className="top-bar-left-center">
                
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={goBack}
                     style={{transform: 'rotate(90deg)'}}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.625C21.348 2.625 21.6819 2.76328 21.928 3.00942C22.1742 3.25556 22.3124 3.5894 22.3124 3.9375V34.8941L30.5707 26.6332C30.8171 26.3868 31.1514 26.2483 31.4999 26.2483C31.8485 26.2483 32.1827 26.3868 32.4292 26.6332C32.6756 26.8797 32.8141 27.214 32.8141 27.5625C32.8141 27.911 32.6756 28.2453 32.4292 28.4918L21.9292 38.9918C21.8073 39.114 21.6624 39.211 21.503 39.2771C21.3435 39.3433 21.1726 39.3773 20.9999 39.3773C20.8273 39.3773 20.6564 39.3433 20.4969 39.2771C20.3375 39.211 20.1926 39.114 20.0707 38.9918L9.5707 28.4918C9.32425 28.2453 9.18579 27.911 9.18579 27.5625C9.18579 27.214 9.32425 26.8797 9.5707 26.6332C9.81715 26.3868 10.1514 26.2483 10.4999 26.2483C10.8485 26.2483 11.1827 26.3868 11.4292 26.6332L19.6874 34.8941V3.9375C19.6874 3.5894 19.8257 3.25556 20.0719 3.00942C20.318 2.76328 20.6519 2.625 20.9999 2.625V2.625Z"/>
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
                        //Para arreglar el error del navbar subiendo mucho
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        />
                </div>

                <div className="edit-profile-tab">
                    <h2> TODAY'S TALK </h2>
                    <textarea 
                        type="text" 
                        name="description"
                        value={ description }
                        onChange={ handleInputChange }
                        //Para arreglar el error del navbar subiendo mucho
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                    />
                </div>

                <div className="edit-profile-tab" style={{padding:'0px'}}>
                    <div className="sortable-container-title">
                        <h2> Order </h2>
                    </div>
                        <hr/>
                    <SortableContainer  
                        onSortEnd={onSortEnd} 
                        useDragHandle 
                        helperClass="sortableHelperEdit" 
                        lockAxis={'y'}
                        onSortOver={vibrate}
                        onSortStart={vibrate}
                        lockToContainerEdges={true}	
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
        <AnimatePresence>
        
            { 
                cropperState.show &&
                <CropperComponent
                    cropperState={cropperState}
                    setCropperState={setCropperState}
                    aspect={1 / 1}
                    setImg={setdiaryImg}
                    isUpdate={false}
                />
            }

        </AnimatePresence>
        </>
    )
}
