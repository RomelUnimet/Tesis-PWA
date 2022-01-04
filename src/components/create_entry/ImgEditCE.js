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
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={close}
                     style={{transform: 'rotate(90deg)'}}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.625C21.348 2.625 21.6819 2.76328 21.928 3.00942C22.1742 3.25556 22.3124 3.5894 22.3124 3.9375V34.8941L30.5707 26.6332C30.8171 26.3868 31.1514 26.2483 31.4999 26.2483C31.8485 26.2483 32.1827 26.3868 32.4292 26.6332C32.6756 26.8797 32.8141 27.214 32.8141 27.5625C32.8141 27.911 32.6756 28.2453 32.4292 28.4918L21.9292 38.9918C21.8073 39.114 21.6624 39.211 21.503 39.2771C21.3435 39.3433 21.1726 39.3773 20.9999 39.3773C20.8273 39.3773 20.6564 39.3433 20.4969 39.2771C20.3375 39.211 20.1926 39.114 20.0707 38.9918L9.5707 28.4918C9.32425 28.2453 9.18579 27.911 9.18579 27.5625C9.18579 27.214 9.32425 26.8797 9.5707 26.6332C9.81715 26.3868 10.1514 26.2483 10.4999 26.2483C10.8485 26.2483 11.1827 26.3868 11.4292 26.6332L19.6874 34.8941V3.9375C19.6874 3.5894 19.8257 3.25556 20.0719 3.00942C20.318 2.76328 20.6519 2.625 20.9999 2.625V2.625Z"/>
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
