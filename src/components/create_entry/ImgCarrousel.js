import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
//Swiper Css
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
    Pagination
  } from 'swiper/core';

import '../../scss/create_entry/img_carrousel.scss'
import { ConfirmModal } from '../modals/ConfirmModal';
import { ImgEditCE } from './ImgEditCE';

export const ImgCarrousel = ({ entryImgState, setEntryImgState, setImgInputIsEmpty }) => {


    const swiperRef = useRef(null);  
    //Cambiar nombre a Set SlidesState o algo asi
    const [state, setstate] = useState(entryImgState)
    const [activeIndex, setActiveIndex] = useState(state.length-1)

    const [imgEditorState, setImgEditorState] = useState(false)

    const moreThanOne = entryImgState.length>1
    let auxImgState = entryImgState;

    SwiperCore.use([Pagination]);

    const imgInput = useRef(null);

    useEffect(() => {
        swiperRef.current?.swiper.slideTo(entryImgState.length,0)
    }, [entryImgState])

    const addImg = () =>{
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
            
                auxImgState = entryImgState;
                auxImgState.push({
                    img: reader.result,
                    thumbnail: false
                })

            setstate(auxImgState);      
            setImgInputIsEmpty(true)
            setImgInputIsEmpty(false)
        };
    }

    //NO ESTA BORRANDO LAS IMAGENES BIEN CUANDO SE SUBEN 3 IMAGENES SEGUIDAS, BORRAS 1 Y DESPUES NO QUIERE BORRAR LAS DEMAS
    const removeImg = () =>{
        console.log(activeIndex)
        auxImgState.splice(activeIndex, 1); //Esta tomando el ultimo renderizado, debo mantener ese estado
        setstate(auxImgState)
        //swiperRef.current?.swiper.removeSlide(swiperRef.current?.swiper.activeIndex)
        if (entryImgState.length===0){
            setImgInputIsEmpty(true);
        }
        if (entryImgState.length===1){
            swiperRef.current.swiper.allowTouchMove=false;
        }
        swiperRef.current?.swiper.update()
        setImgPromptState(false)
    }

    const [imgPromptState, setImgPromptState] = useState(false)

    
    const removeImgPrompt = () =>{
        setImgPromptState(true)
    }
    
    const auxActiveIndex = () => {
        setActiveIndex(swiperRef.current?.swiper.activeIndex-1)
    }

    const goToEditImg = () => {
        setImgEditorState(true)
    }

   
    return (

        <>
            <div className="ce-img-carrousel">
                <Swiper
                    ref={swiperRef}    
                    className='ce-swiper-container'   
                    loop={moreThanOne}       
                    pagination={moreThanOne}
                    allowTouchMove={moreThanOne}
                    onSlideChange={auxActiveIndex}
                >
                    {
                        state.map((img, index)=>(
                                <SwiperSlide key={index} className='ce-swiper-slide' style={{ backgroundImage: `url(${img.img})` }}>  
                                    
                                </SwiperSlide>
                            ))
                    }
                </Swiper>

                <div className="ce-slider-icon-container">
                    <label>
                        <input type="file" id="cardPhotoInput" onChange={addImg} ref={imgInput} accept="image/*" multiple/>
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.9999 17H18.9999V6C18.9999 5.73478 18.8946 5.48043 18.707 5.29289C18.5195 5.10536 18.2651 5 17.9999 5C17.7347 5 17.4804 5.10536 17.2928 5.29289C17.1053 5.48043 16.9999 5.73478 16.9999 6V17H5.99992C5.73471 17 5.48035 17.1054 5.29282 17.2929C5.10528 17.4804 4.99992 17.7348 4.99992 18C4.99499 18.13 5.01797 18.2595 5.06732 18.3798C5.11667 18.5001 5.19124 18.6085 5.286 18.6976C5.38076 18.7867 5.49352 18.8544 5.61667 18.8962C5.73983 18.938 5.87051 18.953 5.99992 18.94H16.9999V30C16.9999 30.2652 17.1053 30.5196 17.2928 30.7071C17.4804 30.8946 17.7347 31 17.9999 31C18.2651 31 18.5195 30.8946 18.707 30.7071C18.8946 30.5196 18.9999 30.2652 18.9999 30V19H29.9999C30.2651 19 30.5195 18.8946 30.707 18.7071C30.8946 18.5196 30.9999 18.2652 30.9999 18C30.9999 17.7348 30.8946 17.4804 30.707 17.2929C30.5195 17.1054 30.2651 17 29.9999 17Z"/>
                        </svg>
                    </label>

                    <svg  viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" 
                          onClick={removeImgPrompt}
                    >
                        <path d="M30 13H6"  strokeWidth="3" strokeLinecap="round"/>
                    </svg>

                    <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                         onClick={goToEditImg}
                    >
                        <path strokeWidth="1" d="M0.901953 12.3872L20.3844 23.0103C20.5758 23.0923 20.7809 23.1333 20.9996 23.1333C21.109 23.1333 21.2184 23.1196 21.3277 23.0923C21.4371 23.0649 21.5328 23.0376 21.6148 23.0103L41.3434 12.3872C41.8082 12.1411 42.027 11.7446 41.9996 11.1978C41.9996 10.9517 41.9381 10.7261 41.815 10.521C41.692 10.3159 41.5211 10.1587 41.3023 10.0493L21.8199 0.164551C21.4098 -0.0268555 21.0133 -0.0268555 20.6305 0.164551L0.942969 10.0493C0.724219 10.1587 0.546484 10.3159 0.409766 10.521C0.273047 10.7261 0.204688 10.9517 0.204688 11.1978C0.204688 11.7446 0.437109 12.1411 0.901953 12.3872ZM21.2047 2.78955L37.857 11.2798L20.9996 20.3442L4.34727 11.2798L21.2047 2.78955ZM41.0563 19.688L37.1598 17.7192L34.3707 19.2368L37.652 20.9185L20.7945 29.9829L4.14219 20.9185L7.62852 19.1548L4.83945 17.6372L0.696875 19.688C0.232031 19.9341 -0.00722656 20.3237 -0.0208984 20.8569C-0.0345703 21.3901 0.191016 21.7798 0.655859 22.0259L20.1383 32.6489C20.357 32.7583 20.5758 32.813 20.7945 32.813C20.9039 32.813 21.0064 32.7993 21.1021 32.772C21.1979 32.7446 21.3004 32.7036 21.4098 32.6489L41.0973 22.0259C41.5621 21.7798 41.7945 21.3901 41.7945 20.8569C41.7945 20.3237 41.5484 19.9341 41.0563 19.688ZM41.0563 28.8755L37.3648 27.0708L34.5758 28.5884L37.652 30.106L20.7945 39.1704L4.14219 30.106L7.38242 28.6294L4.59336 27.1118L0.696875 28.8755C0.232031 29.1216 -0.00722656 29.5112 -0.0208984 30.0444C-0.0345703 30.5776 0.191016 30.9673 0.655859 31.2134L20.1383 41.8364C20.2203 41.8638 20.2955 41.8911 20.3639 41.9185C20.4322 41.9458 20.5006 41.9663 20.5689 41.98C20.6373 41.9937 20.7125 42.0005 20.7945 42.0005C20.9039 42.0005 21.0064 41.9868 21.1021 41.9595C21.1979 41.9321 21.3004 41.8911 21.4098 41.8364L41.0973 31.2134C41.5621 30.9673 41.7945 30.5776 41.7945 30.0444C41.7945 29.5112 41.5484 29.1216 41.0563 28.8755Z"/>
                    </svg>
                </div>

                
                
            </div>

            <ConfirmModal
                title={'Do you want to delete this photo?'}
                text={''}
                rightText={'Delete'} 
                leftText={'Cancel'}
                confirmAction={removeImg}
                isActive={imgPromptState}
                setIsActive={setImgPromptState}
            />

            <ImgEditCE
                imgEditorState={imgEditorState}
                setImgEditorState={setImgEditorState}
                entryImgState={entryImgState}
                setEntryImgState={setEntryImgState}
            />

        </>

        

        
    )
    
}
