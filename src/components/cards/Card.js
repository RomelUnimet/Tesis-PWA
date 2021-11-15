import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../scss/cards/card.scss'



export const Card = ( {cid, color, entries, month, photo, uid, year, modalState, setModalState, cropperState, setCropperState, setvariants} ) => {

    const monthName = new Date(year,month)
    const shortMonthName = monthName.toLocaleString('en-US', { month: 'short' }).toUpperCase()

    const hasPhoto = !!photo.length
    
    //ver si funciona correctamente con img
    //Sino se pasa directo al componente
    const bImgStyles = {
        backgroundImage: `url(${photo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',   
    }
  
    //ESTO SE TIENE QUE CAMBIAR PARA QUE SEAN LAS ENTRADASCON FECHAS DIFERENTES
    const daysOfMonth = new Date(year, month+1, 0).getDate()

    const dateArray = entries.map((e)=> e.edate?.getDate())

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const uniqueDateArray  = dateArray.filter(onlyUnique)

    const progress = (uniqueDateArray.length / daysOfMonth)*100;
    
 
    const showModal = (e) => {

        e.stopPropagation();

        setModalState({
            ...modalState,
            show: true,
            card:{ cid, color, entries, month, photo, uid, year }
        })
        setCropperState({
            ...cropperState,
            card:{ cid, color, entries, month, photo, uid, year }
        })

    }

    const history = useHistory();

    const goToCardDetails= (e)=> {
        e.preventDefault()
        setvariants({
            initial:{x:-40, transition:{duration:0.35} },
            in:{ x:0,transition:{duration:0.35}},
            out:{x:-40,transition:{duration:0.35}}
        })
        history.push(`/cards/detailedcard/${cid}`);
    }

   

    return (
        <div className="card-component" style={ hasPhoto? bImgStyles :{backgroundColor:color}}
        onClick={goToCardDetails}
        >
            <div className="month-title">
                <h1> { month+1 } </h1>
                <h3> { shortMonthName } </h3>
            </div>
            <div className="progress-edit">
                
                <div className="bar-container">
                    <div className="progress-container">
                        <div className="progress-filler" style={{width:progress}} >

                        </div> 
                    </div>

                    <p className="fraction-progress"> <b> {uniqueDateArray.length} </b>/{daysOfMonth} </p>

                </div>

                <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
                    onClick={showModal}
                >
                    <path d="M17.0001 19.8334C18.5649 19.8334 19.8334 18.5649 19.8334 17.0001C19.8334 15.4353 18.5649 14.1667 17.0001 14.1667C15.4353 14.1667 14.1667 15.4353 14.1667 17.0001C14.1667 18.5649 15.4353 19.8334 17.0001 19.8334Z" />
                    <path d="M26.9166 19.8334C28.4814 19.8334 29.7499 18.5649 29.7499 17.0001C29.7499 15.4353 28.4814 14.1667 26.9166 14.1667C25.3518 14.1667 24.0833 15.4353 24.0833 17.0001C24.0833 18.5649 25.3518 19.8334 26.9166 19.8334Z" />
                    <path d="M7.08333 19.8334C8.64814 19.8334 9.91667 18.5649 9.91667 17.0001C9.91667 15.4353 8.64814 14.1667 7.08333 14.1667C5.51853 14.1667 4.25 15.4353 4.25 17.0001C4.25 18.5649 5.51853 19.8334 7.08333 19.8334Z" />
                </svg>

            </div>
            
        </div>
    )
}
