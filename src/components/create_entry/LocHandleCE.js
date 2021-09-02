import React, { useCallback, useEffect, useState } from 'react'
import '../../scss/create_entry/handlemodals.scss'
import { animated, useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useSelector } from 'react-redux'
import { HandlerMenuModal } from '../modals/HandlerMenuModal'
import { generateID } from '../../helpers/generateId'

export const LocHandleCE = ({handlerState, setHandlerState}) => {

    const closeHandler = () =>{
        animateClose();
        setTimeout(() => {
            setHandlerState({
                ...handlerState,
                show:false,
            })
        }, 300);
    }
    const SCREEN_HEIGHT = window.innerHeight;

    const [{ y }, api] = useSpring(() => ({ y: 0 }));
    const height = 330;

    
    const open = useCallback(() => {
        api.start({ y: 0, immediate: false, config: config.default })
    }, [api] )
    const close = () => {
        animateClose()
        setTimeout(() => {
            closeHandler();
        }, 250);
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
        if(handlerState.show){      
            open()
        }
    }, [handlerState,open])
    useEffect(() => {
        api.start({ y: SCREEN_HEIGHT, immediate: true }) 
    }, [SCREEN_HEIGHT,api])

    //Logica Funcional

    const [selectedLocation, setSelectedLocation] = useState('')

    //Update Tag Modal
    const [updateInputModal, setUpdateInputModal] = useState(false)

    //Delete Tag Modal
    const [deleteModal, setDeleteModal] = useState(false)

    const [menuModalState, setMenuModalState] = useState({
        show:false,
        tag:{},
    })

    //const {locations} = useSelector(state => state.locations)
    const {uid} = useSelector(state => state.auth);

    const locations = [
        {
            lid: 'LocationID',
            uid: uid,
            name: 'Test Location 1', //Name value
            description: 'This is a test location', //De la direccion
            latitude: '123', //Del location dado por el mapa
            longitude: '1213', //Del location dado por el mapa
            entries: [],
        },
        {
            lid: 'LocationID 2',
            uid: uid,
            name: 'Test Location 2', //Name value
            description: 'This is a test locationadvasdvasdkjvaosidvboaisudbvouasdbvoiausdvoiuasdvoiuabsdoiuvbaosiudvbaoisudbvoiasu', //De la direccion
            latitude: '123', //Del location dado por el mapa
            longitude: '1213', //Del location dado por el mapa
            entries: [],
        },
    ]


    /*
    const createLocation = () => {

        const newLocation = {
            lid: generateID(),
            uid: uid,
            name: '', //Name value
            description: '', //De la direccion
            latitude: '', //Del location dado por el mapa
            longitude: '', //Del location dado por el mapa
            entries: [],
        }

        //dispatch( tagCreate(newTag) );

        //setInputModal(false)
    }
    */
    
    const isSelected = (lid) => {
        return selectedLocation===lid
    }
    
    const toggleLocation = (lid) => {

        if (selectedLocation===lid){

            setSelectedLocation('')
        } else {
            setSelectedLocation(lid)
        }

        console.log(selectedLocation)
    }
    
    
    const openMenuItem = (e, location) => {

        e.stopPropagation();

        setMenuModalState({
            ...menuModalState,
            show: true,
            location:{ ...location }
        })

    }
    
    /*
    const editTag = () => {

        dispatch( tagUpdate(updateInputModalValue, menuModalState.tag) )
        setUpdateInputModal(false)
        setMenuModalState({
            ...menuModalState,
            show:false,
        })
        
    }
    const deleteTag = () => {

        dispatch( tagDelete(menuModalState.tag) )
        setDeleteModal(false)
        setMenuModalState({
            ...menuModalState,
            show:false,
        })
    }
    */


    return (
        <>
            <div className="handler-container-back"
                style={ handlerState.show? { display:'inline' } : { display:'none' }}
            >    
            </div>

            {handlerState.show?
                <>
                <animated.div className="handler-container" style={{y: y, touchAction: 'none'}} {...bindModal()}
                >
                    <div className="handler-top-bar">
                        
                        <svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="handler-close"
                            onClick={closeHandler}
                        >
                            <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z" fill="#555555"/>
                        </svg>
    
                        <h1>Location<p> {locations.length} </p> </h1>
    
                        <div className="handler-add-order">
                            <svg  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.9999 17H18.9999V6C18.9999 5.73478 18.8946 5.48043 18.707 5.29289C18.5195 5.10536 18.2651 5 17.9999 5C17.7347 5 17.4804 5.10536 17.2928 5.29289C17.1053 5.48043 16.9999 5.73478 16.9999 6V17H5.99992C5.73471 17 5.48035 17.1054 5.29282 17.2929C5.10528 17.4804 4.99992 17.7348 4.99992 18C4.99499 18.13 5.01797 18.2595 5.06732 18.3798C5.11667 18.5001 5.19124 18.6085 5.286 18.6976C5.38076 18.7867 5.49352 18.8544 5.61667 18.8962C5.73983 18.938 5.87051 18.953 5.99992 18.94H16.9999V30C16.9999 30.2652 17.1053 30.5196 17.2928 30.7071C17.4804 30.8946 17.7347 31 17.9999 31C18.2651 31 18.5195 30.8946 18.707 30.7071C18.8946 30.5196 18.9999 30.2652 18.9999 30V19H29.9999C30.2651 19 30.5195 18.8946 30.707 18.7071C30.8946 18.5196 30.9999 18.2652 30.9999 18C30.9999 17.7348 30.8946 17.4804 30.707 17.2929C30.5195 17.1054 30.2651 17 29.9999 17Z" fill="#555555"/>
                            </svg>
    
                            <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.4374 5.66675L24.2957 5.67666C24.0408 5.71096 23.807 5.83653 23.6377 6.03009C23.4683 6.22366 23.375 6.47207 23.3749 6.72925V24.7096L18.8132 20.1507L18.6942 20.0487C18.4786 19.8885 18.2102 19.8158 17.9432 19.8455C17.6762 19.8751 17.4303 20.0047 17.2551 20.2084C17.0798 20.412 16.9882 20.6745 16.9987 20.9429C17.0091 21.2114 17.1209 21.4659 17.3115 21.6552L23.6922 28.0302L23.8112 28.1322C24.0159 28.2834 24.268 28.3561 24.5217 28.3372C24.7755 28.3182 25.014 28.2088 25.1939 28.0288L31.5646 21.6538L31.6666 21.5348C31.8182 21.3301 31.8911 21.0776 31.8721 20.8236C31.8531 20.5695 31.7435 20.3307 31.5632 20.1507L31.4442 20.0487C31.2394 19.8972 30.987 19.8242 30.7329 19.8432C30.4789 19.8622 30.2401 19.9719 30.0601 20.1522L25.4999 24.7152V6.72925L25.4914 6.58475C25.4564 6.33038 25.3306 6.09726 25.1371 5.9285C24.9436 5.75974 24.6955 5.66676 24.4388 5.66675H24.4374ZM8.80303 5.97841L2.43653 12.3463L2.33311 12.4653C2.18194 12.67 2.10923 12.9221 2.12821 13.1759C2.14718 13.4296 2.25659 13.6681 2.43653 13.848L2.55553 13.9514C2.7602 14.1026 3.01232 14.1753 3.26606 14.1563C3.5198 14.1373 3.7583 14.0279 3.9382 13.848L8.49562 9.28916V27.278L8.50695 27.4225C8.54187 27.6769 8.66771 27.91 8.86121 28.0787C9.05471 28.2475 9.30278 28.3405 9.55953 28.3405L9.70261 28.3306C9.95724 28.296 10.1907 28.1703 10.3597 27.9767C10.5288 27.7832 10.622 27.535 10.622 27.278L10.6206 9.292L15.1865 13.8494L15.3055 13.9514C15.5213 14.1097 15.7888 14.1807 16.0547 14.1503C16.3205 14.1199 16.5651 13.9903 16.7396 13.7874C16.914 13.5845 17.0055 13.3232 16.9957 13.0558C16.9859 12.7884 16.8756 12.5345 16.6868 12.3449L10.3061 5.97841L10.1857 5.87641C9.98103 5.72524 9.72891 5.65253 9.47517 5.67151C9.22143 5.69048 8.98293 5.79989 8.80303 5.97983V5.97841Z" fill="#555555"/>
                            </svg>
                        </div>
                    </div>
                    <hr/>

                    {
                        locations.map((location, index)=>(
                            <div key={location.lid} className="handler-item-container">
                                <div className="handler-item" key={index} 
                                    onClick={()=>toggleLocation( location.lid )}
                                >
                                    <div className="handler-check-name-description">
                                    
                                        
                                            { isSelected(location.lid)?      
                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="32" height="32" rx="16" fill="#3CDAFD"/>
                                                    <path d="M7 16.25L13.25 22.5L23.6666 10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            :
                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="32" height="32" rx="16" fill="#C4C4C4"/>
                                                </svg>
                                            }
                                            
                                            <div>
                                                <h2> {location.name} </h2>
                                                <p> {location.description} </p>
                                            </div>
                                    </div>

                                    <div className="handler-entries-menu">
                                        <h2> { location.entries.length } </h2>
                                        <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="menu-svg-icon"
                                              onClick={
                                                  (e)=>{
                                                      openMenuItem(e, location)
                                                }
                                              }
                                              
                                        >
                                            <path d="M17.0001 19.8334C18.5649 19.8334 19.8334 18.5649 19.8334 17.0001C19.8334 15.4353 18.5649 14.1667 17.0001 14.1667C15.4353 14.1667 14.1667 15.4353 14.1667 17.0001C14.1667 18.5649 15.4353 19.8334 17.0001 19.8334Z" />
                                            <path d="M26.9166 19.8334C28.4814 19.8334 29.7499 18.5649 29.7499 17.0001C29.7499 15.4353 28.4814 14.1667 26.9166 14.1667C25.3518 14.1667 24.0833 15.4353 24.0833 17.0001C24.0833 18.5649 25.3518 19.8334 26.9166 19.8334Z" />
                                            <path d="M7.08333 19.8334C8.64814 19.8334 9.91667 18.5649 9.91667 17.0001C9.91667 15.4353 8.64814 14.1667 7.08333 14.1667C5.51853 14.1667 4.25 15.4353 4.25 17.0001C4.25 18.5649 5.51853 19.8334 7.08333 19.8334Z" />
                                        </svg>
                                    </div>

                                </div>
                                <hr />
                            </div>

                        ))

                    }
    
                    
                </animated.div>

                <HandlerMenuModal
                    modalState={menuModalState}
                    setModalState={setMenuModalState}
                    setUpdateInputModal={setUpdateInputModal}
                    setDeleteModal={setDeleteModal} 
                />   

                </>
                :
                <></>
            }
            
        </>
    )
}
