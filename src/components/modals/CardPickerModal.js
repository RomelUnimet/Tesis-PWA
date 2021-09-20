import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../../scss/modals/cardPickerModal.scss'
import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

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

        animateClose()
        setTimeout(() => {
            setModalState({
                ...modalState,
                show:false
            })
        }, 200);
    }

    const navigateToCard = ( month, year ) => {

        animateClose()
        setTimeout(() => {
            setModalState({
                show:false,
                year:year,
                month:month,
            })
            navigateCard(month);
        }, 100);
        
    }

    //ANIMATIONS & GESTURES

    const SCREEN_HEIGHT = window.innerHeight;

    const [{ y }, api] = useSpring(() => ({ y: 0 }));
    const height = 330;

    
    const open = useCallback(() => {
        api.start({ y: 0, immediate: false, config: config.default })
    }, [api] )
    
    const close = () => {
        animateClose()
        setTimeout(() => {
            closeModal();
        }, 200);
    }

    const bindModal = useDrag(
        ({ last, vxvy: [, vy], movement: [, my], canceled }) => {
          if (my < -90) close()
    
          if (last) {
            my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled })
          }
          else api.start({ y: my, immediate: true })
        },
        { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: false }
      )

    const animateClose = () => {
        api.start({ y: SCREEN_HEIGHT, immediate: false, config:config.default })
    } 

    useEffect(() => {
        if(modalState.show){      
            open()
        }
    }, [modalState,open])
    useEffect(() => {
        api.start({ y: SCREEN_HEIGHT, immediate: true }) 
    }, [SCREEN_HEIGHT,api])

    return (
        <>
            <div className="modal-container"
                onClick={closeModal}
                style={ modalState.show? { display:'inline' } :{ display:'none' }}
            >
            </div>

            {modalState.show?
            
            <animated.div className="modal-card" style={{y: y, touchAction: 'none'}} {...bindModal()} >
                
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
                                                            onMouseUp ={ () => {navigateToCard(card.month, card.year)} }
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

            </animated.div>
            :
            <></>
            }
        </>
    )
}
