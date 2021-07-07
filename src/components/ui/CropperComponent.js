import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import '../../scss/ui/cropper.scss'
import { cardUpdatePhoto } from "../../actions/cards";
import { useDispatch } from "react-redux";

//Pendiente con los Known Issues
export const CropperComponent = ({ cropperState, setCropperState }) => {

    //const [guides, setGuides] = useState(true)

    const dispatch = useDispatch()
    const cropperRef = useRef(null);

    const onCrop = () => {

        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
      
        const croppedImg = cropper.getCroppedCanvas().toDataURL( 'image/', 1 ); //Numero 1 representa la calidad de la img y va de 0.1 a 1
        
        dispatch(cardUpdatePhoto(croppedImg, cropperState.card));

        //AQUI LO GUARDO EN LAS BASES DE DATOS
        //Creo que debo bajarle la resolucion a la imagen en algun punto

        cancel();

    };

    const cancel = () => {

        setCropperState({
            ...cropperState,
            show:false,
            img:''
        })

    }
    const reset = () => {

        cropperRef?.current.cropper.reset()

    }


    return (
        <div 
             //Slide Out del Cropper no funciona
             className={ cropperState.show? 'animate__animated animate__fadeIn cropper-container' : 'animate__animated animate__slideOutDown cropper-container-exit' }
        >

           { cropperState.show?
           
            <Cropper
                style={{ height: '60%', width: "100%" }}
                aspectRatio={7 / 10}
                zoomTo={0.3}
                viewMode={3}
                background={false}
                responsive={true}
                autoCropArea={0.9}
                dragMode={"move"}
                cropBoxMovable={true} //Cambiarlo si es necesario, no se siente muy bien         
                guides={true}  //Ver si puedo apagarlas cuando se mueve
                src={cropperState.img}
                center={false}
                ref={cropperRef}
                
                //cropmove={move}
                //crop={onCrop}
            /> 
            :
            <div></div>
            }

            <div className="cropper-toolbar">
                <button 
                    className="cropper-btn-cancel"
                    onClick={cancel}
                >
                        Cancel
                </button>
                <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                      onClick={reset}
                >
                    <path d="M18 28C20.3734 28 22.6935 27.2962 24.6668 25.9776C26.6402 24.6591 28.1783 22.7849 29.0866 20.5922C29.9948 18.3995 30.2324 15.9867 29.7694 13.6589C29.3064 11.3312 28.1635 9.19295 26.4853 7.51472C24.8071 5.83649 22.6689 4.6936 20.3411 4.23058C18.0133 3.76756 15.6005 4.0052 13.4078 4.91345C11.2151 5.8217 9.34094 7.35977 8.02236 9.33316C6.70379 11.3066 6 13.6266 6 16V22.2L2.4 18.6L1 20L7 26L13 20L11.6 18.6L8 22.2V16C8 14.0222 8.58649 12.0888 9.6853 10.4443C10.7841 8.79981 12.3459 7.51809 14.1732 6.76121C16.0004 6.00433 18.0111 5.8063 19.9509 6.19215C21.8907 6.578 23.6725 7.53041 25.0711 8.92894C26.4696 10.3275 27.422 12.1093 27.8079 14.0491C28.1937 15.9889 27.9957 17.9996 27.2388 19.8268C26.4819 21.6541 25.2002 23.2159 23.5557 24.3147C21.9112 25.4135 19.9778 26 18 26V28Z"/>
                </svg>
                <button 
                    className="cropper-btn-done"
                    onClick={onCrop}
                >
                        Done
                </button>
            </div>

        </div>
    )
}
