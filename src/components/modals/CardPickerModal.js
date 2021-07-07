import React from 'react'
import { useSelector } from 'react-redux'
import '../../scss/modals/cardPickerModal.scss'

export const CardPickerModal = ({ modalState, setModalState, navigateCard }) => {

    const {cards} = useSelector(state => state.cards) //Esto puede traer un error ya que en una instancia es vacio (Probablemente por el dispatch async) => Tal vez necesita un check

    const years = []
    let aux = []
    let counter=0;

    for (let index = 0; index < cards.length; index++) {
        
        aux.push(cards[index]);
        counter++;

        if(counter===12){
            years.push(aux);
            aux = []
            counter=0;
        }
    }

    const closeModal = () =>{

        setModalState({
            ...modalState,
            show:false
        })
    }

    const navigateToCard = ( month, year ) => {

        setModalState({
            show:false,
            year:year,
            month:month
        })

        navigateCard(month);

    }

    return (
        <>
            <div className="modal-container"
                onClick={closeModal}
                style={ modalState.show? { display:'inline' } :{ display:'none' }}
            >
            </div>
            <div className={modalState.show? "animate__animated animate__slideInUp modal-card" : "animate__animated animate__slideOutDown modal-card2" }  
                >
                    
                <div className="arrow-1">
                    <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="month-picker">
                    { 
                        years.map((yearGroup, index)=>(


                            <div className="year" key={index}>
                                <h1> {yearGroup[0].year} </h1>

                                <div className="month-grid">
                                    { 
                                        yearGroup.map((card, index)=>{
                                            
                                            let monthName = new Date(card.year,card.month)
                                            let shortMonthName = monthName.toLocaleString('en-US', { month: 'short' }).toUpperCase()

                                            return(

                                                <div className="month-picker-selector" key={index} 
                                                    style={ 
                                                            modalState.month===card.month && modalState.year===card.year? 
                                                                {color:'#3CDAFD', border:'1px solid #3CDAFD'}
                                                                :
                                                                {}
                                                            
                                                            }      
                                                    onClick={ () => {navigateToCard(card.month, card.year)} }
                                                > 
                                                        <p className="month-picker-name"
                                                        >
                                                            {shortMonthName}
                                                        </p> 
                                                        
                                                        <p className="month-picker-entries"
                                                            style={ 
                                                                modalState.month===card.month && modalState.year===card.year? 
                                                                    {color:'#3CDAFD'}
                                                                    :
                                                                    {}
                                                                }   
                                                        >
                                                            {card.entries.length}
                                                        </p>
                                                </div>
                                            )
                                    })
                                    }
                                </div>

                            </div>
                        )) 
                    
                    }
                </div>

                <div className="arrow-2">
                    <svg  viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

            </div>
        </>
    )
}
