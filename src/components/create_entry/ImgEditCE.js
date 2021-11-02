import React, { useCallback, useEffect, useState } from 'react'
import '../../scss/create_entry/img_edit.scss' 
import { ConfirmModal } from '../modals/ConfirmModal'
import { ImgEditor } from '../ui/ImgEditor'

import {
    sortableContainer,
    sortableElement,
    sortableHandle,
  } from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { AnimatePresence } from 'framer-motion';

export const ImgEditCE = ({imgEditorState, setImgEditorState, entryImgState, setEntryImgState, removeImgInEditor, addImg, imgInput, swiperRef, imgInSwiperState, setImgInSwiperState}) => {

    const [removeImgPrompt, setRemoveImgPrompt] = useState(false)
    const [imgClicked, setImgClicked] = useState(0)
    const [editorState, setEditorState] = useState({
        show: false,
        img:'',
        index: 100,
    })

    const toggleThumbnail = (image_index) => {
        
        let auxArray = entryImgState;
        for (let index = 0; index < entryImgState.length; index++) {
            auxArray[index].thumbnail = false;
        }
        auxArray[image_index].thumbnail = true;
        setEntryImgState([...auxArray]);
    }

    const deleteImg = (image_index) => {
        setImgClicked(image_index)
        setRemoveImgPrompt(true)
    }

    const deleteImgFunction = () => {

        removeImgInEditor(imgClicked)
        setRemoveImgPrompt(false)
    }

    const openImgEditorModal = (img, index) => {
        setEditorState({
                        ...editorState,
                        show:true,
                        img:img,
                        index: index
                    })
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        let aux = arrayMoveImmutable(entryImgState, oldIndex, newIndex)
        setEntryImgState([...aux]);
        setImgInSwiperState([...aux]);
        swiperRef.current?.swiper.update()
    };

    const vibrate = () => {
        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(100);
         } else {
            console.log('vibrar')
         }
    }

    //Definicion de los componentes del sortable
    const SortableItem = sortableElement(({img, indexImg}) => {
    return(
        <div className="editor-image-tab">

            <div className="editing-buttons">
                <div className="img-edit"
                     style = {{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${img.photo})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',   
                            }}
                     onClick={()=>openImgEditorModal(img.photo, indexImg)}
                >
                                    
                     <p>Edit</p>
                                    
                </div>
                                    
                <svg viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg" 
                     className="img-edit-thumbnail"
                     style={img.thumbnail? {fill:'#3CDAFD'} : {fill:'#B6B6B6'} }
                     onClick={()=>toggleThumbnail(indexImg)}
                >
                    <path d="M3.66675 35.625H40.3334V39.375H3.66675V35.625ZM3.66675 9.375L12.8334 15.9375L22.0001 3.75L31.1667 15.9375L40.3334 9.375V31.875H3.66675V9.375ZM7.33341 16.5769V28.125H36.6667V16.5769L30.3967 21.0656L22.0001 9.9L13.6034 21.0656L7.33341 16.575V16.5769Z" />
                </svg>
                <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" 
                     className="img-edit-trash"      
                     onClick={()=>deleteImg(indexImg)}
                >
                    <path d="M14.625 7.3125L15.8438 2.4375H23.1562L24.375 7.3125M34.125 7.3125H7.3125L9.75 36.5625H29.25L31.6875 7.3125H4.875H34.125ZM19.5 14.625V29.25V14.625ZM25.5938 14.625L24.375 29.25L25.5938 14.625ZM13.4062 14.625L14.625 29.25L13.4062 14.625Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>

            <DragHandle/>
        </div>
      )});
      
    const SortableContainer = sortableContainer(({children}) => {
        return <ul>{children}</ul>;
    });
    const DragHandle = sortableHandle(() => (
        <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className="img-editor-drag-handle"
              style={{stroke:'none'}}
        >
            <path d="M35 10.9375H0V8.75H35V10.9375ZM35 28.4375H0V26.25H35V28.4375ZM35 19.67H0V17.5H35V19.67Z" />
        </svg>
    ))

    //ANIMACIONES
    const SCREEN_WIDTH = window.innerWidth;

    const [{ x }, api] = useSpring(() => ({ x: SCREEN_WIDTH }));

    const closeModal = () =>{
        setTimeout(() => {
            setImgEditorState(false)
        }, 300);
    }
    
    const open = useCallback(() => {
        api.start({ x: 0, immediate: false, config: config.default })
    }, [api] )
    
    const close = () => {
        animateClose()
        setTimeout(() => {
            closeModal();
        }, 300);
    }

    const bindModal = useDrag(
        ({ last, movement: [mx, ] }) => {
          if (last) {
            mx > SCREEN_WIDTH/3? close() : open()
          }
          else api.start({ x: mx, immediate: true })
        },
        { initial: () => [x.get(), 0], filterTaps: true, bounds: { left: 0 }, rubberband: false, lock:'x' }
      )

    const animateClose = () => {
        api.start({ x: SCREEN_WIDTH, immediate: false, config:config.default })
    } 

    useEffect(() => {
        if(imgEditorState){      
            open()
        }
    }, [imgEditorState,open])

    

    return (
        
        <animated.div className="img-editor-container" style={{x: x, touchAction: 'none'}} >
            <animated.div className="img-edit-drag-handle" style={{x: x/2, touchAction: 'none'}} {...bindModal()}/>

            <div className="img-editor-toolbar">
                <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={close}
                >
                    <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z" fill="#555555"/>
                </svg>

                <div className="img-editor-title">
                    <h1>Photos / Videos</h1>
                    <h3> <strong> {entryImgState.length} </strong> / 3 </h3>
                </div>

                
                <label>
                    <input type="file" id="cardPhotoInput" onChange={addImg} ref={imgInput} accept="image/*" multiple/>
                    <svg  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.9999 17H18.9999V6C18.9999 5.73478 18.8946 5.48043 18.707 5.29289C18.5195 5.10536 18.2651 5 17.9999 5C17.7347 5 17.4804 5.10536 17.2928 5.29289C17.1053 5.48043 16.9999 5.73478 16.9999 6V17H5.99992C5.73471 17 5.48035 17.1054 5.29282 17.2929C5.10528 17.4804 4.99992 17.7348 4.99992 18C4.99499 18.13 5.01797 18.2595 5.06732 18.3798C5.11667 18.5001 5.19124 18.6085 5.286 18.6976C5.38076 18.7867 5.49352 18.8544 5.61667 18.8962C5.73983 18.938 5.87051 18.953 5.99992 18.94H16.9999V30C16.9999 30.2652 17.1053 30.5196 17.2928 30.7071C17.4804 30.8946 17.7347 31 17.9999 31C18.2651 31 18.5195 30.8946 18.707 30.7071C18.8946 30.5196 18.9999 30.2652 18.9999 30V19H29.9999C30.2651 19 30.5195 18.8946 30.707 18.7071C30.8946 18.5196 30.9999 18.2652 30.9999 18C30.9999 17.7348 30.8946 17.4804 30.707 17.2929C30.5195 17.1054 30.2651 17 29.9999 17Z" fill="#555555"/>
                    </svg>
                </label>
            </div>
            <div className="editor-images-container">
                <SortableContainer  
                    onSortEnd={onSortEnd} 
                    useDragHandle 
                    helperClass="sortableHelper" 
                    lockAxis={'y'}
                    onSortOver={vibrate}
                    onSortStart={vibrate}
                    lockToContainerEdges={true} 
                    lockOffset={"-40%"}
                >
                    {
                        entryImgState.map((img, index)=>(
                            <SortableItem key={`item-${index}`} img={img} index={index} indexImg={index}/>
                        ))
                    }
                </SortableContainer>
            </div>
            <AnimatePresence>
                {
                    removeImgPrompt &&
                    
                    <ConfirmModal
                        title={'Do you want to delete this photo?'}
                        text={''}
                        rightText={'Delete'} 
                        leftText={'Cancel'}
                        confirmAction={()=>{deleteImgFunction()}}
                        isActive={removeImgPrompt}
                        setIsActive={setRemoveImgPrompt}
                    />
                }

                {
                    editorState.show &&
                    <ImgEditor
                        editorState={editorState} 
                        setEditorState={setEditorState}
                        entryImgState={entryImgState}
                        setEntryImgState={setEntryImgState}
                    />
                }
            </AnimatePresence>
            
        </animated.div>
                
        
    )
}
