import React, { useState } from 'react'
import '../../../scss/settings/settings-tabs.scss'
import { AnimatePresence, motion } from "framer-motion"
import { useNavAnimation } from '../../../hooks/navAnimationHook'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { TrashEntry } from './TrashEntry'
import { entryDelete, unTrashEntry } from '../../../actions/entry'
import { DeleteConfirm } from '../../modals/DeleteConfirm'

export const TrashScreen = () => {

    const [variants] = useNavAnimation('profile')

    const history = useHistory()

    const dispatch = useDispatch()

    const {entries} = useSelector(state => state.entries)

    const trashEntries = entries.filter((e)=>e.trash)

    const [deleteModal, setdeleteModal] = useState({
        show: false,
        entriesToDelete: []
    })

    const [select, setselect] = useState(false)

    const [selectedEntries, setselectedEntries] = useState([])

    const toggleSelection = () => {

        if(select){
            setselectedEntries([])
        }

        setselect(s=>!s)
    }

    //ALL
    const deleteAllEntries = () => {

        let auxEntries = trashEntries.map((e)=>e.eid)
        
        dispatch( entryDelete(auxEntries) )

        setselectedEntries([])

        toggleSelection()
    }

    //ARRAY OF
    const deleteEntries = () => {
        
        dispatch( entryDelete(selectedEntries) )

        setselectedEntries([])

        toggleSelection()
        
    }

    const deleteConfirmAction = () => {

        if(deleteModal.entriesToDelete===trashEntries.length){


            deleteAllEntries()
            
        } else {

            deleteEntries()

        }

        setdeleteModal({
            ...deleteModal,
            show: false,
            entriesToDelete: []
        })

    }

    const recoverAllEntries = () => {

        let auxEntries = trashEntries.map((e)=>{
            
            return {
                eid: e.eid ,
                location: e.location ,
                tags: e.tags,
                cid: e.cid,
                trash: e.trash
            }
        })

        dispatch( unTrashEntry(auxEntries) )

        setselectedEntries([])

        toggleSelection()
        
    }
    

    const recoverEntries = () => {
        
        let entriesToRecover = trashEntries.filter((e)=> selectedEntries.includes(e.eid))
        
        let auxEntries = entriesToRecover.map((e)=>{
            
            return {
                eid: e.eid ,
                location: e.location ,
                tags: e.tags,
                cid: e.cid,
                trash: e.trash
            }
        })
        
        dispatch( unTrashEntry(auxEntries) )

        setselectedEntries([])

        toggleSelection()
    }


    return (

        <>
            <motion.div
                style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:2, backgroundColor:'#ffffff', overflowY:'auto',}} 
                variants={variants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={{type:'tween'}}
            >
                <div className="top-bar-left-center" style={{justifyContent:'space-between'}}>
                    <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={()=>{history.goBack()}}
                        style={{transform: 'rotate(90deg)'}}
                    >
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.625C21.348 2.625 21.6819 2.76328 21.928 3.00942C22.1742 3.25556 22.3124 3.5894 22.3124 3.9375V34.8941L30.5707 26.6332C30.8171 26.3868 31.1514 26.2483 31.4999 26.2483C31.8485 26.2483 32.1827 26.3868 32.4292 26.6332C32.6756 26.8797 32.8141 27.214 32.8141 27.5625C32.8141 27.911 32.6756 28.2453 32.4292 28.4918L21.9292 38.9918C21.8073 39.114 21.6624 39.211 21.503 39.2771C21.3435 39.3433 21.1726 39.3773 20.9999 39.3773C20.8273 39.3773 20.6564 39.3433 20.4969 39.2771C20.3375 39.211 20.1926 39.114 20.0707 38.9918L9.5707 28.4918C9.32425 28.2453 9.18579 27.911 9.18579 27.5625C9.18579 27.214 9.32425 26.8797 9.5707 26.6332C9.81715 26.3868 10.1514 26.2483 10.4999 26.2483C10.8485 26.2483 11.1827 26.3868 11.4292 26.6332L19.6874 34.8941V3.9375C19.6874 3.5894 19.8257 3.25556 20.0719 3.00942C20.318 2.76328 20.6519 2.625 20.9999 2.625V2.625Z"/>
                    </svg>

                    <h1> Trash </h1>
                    
                    <h2
                        onClick={toggleSelection}
                    > 
                        { !select? 'Select' : 'Cancel' } 
                    </h2>
                </div>

                {
                    trashEntries.length>0?
                        <div className="spacing-div-sections"
                            style={{marginBottom:'8rem'}}
                        >
                            <div className="trash-entries-container">

                                {
                                    trashEntries.map((entry, index)=>(

                                        <TrashEntry 
                                            entry={entry} 
                                            key={index} 
                                            selectedEntries={selectedEntries}
                                            setselectedEntries={setselectedEntries}
                                            select={select}
                                        />

                                    ))
                                }

                            </div>
                        </div>
                        :
                        <h1 className="no-diaries-yet">No diaries yet.</h1>
                }


                {   select &&

                    <div className="select-option-bar">
                        {
                            selectedEntries.length===0 ?

                                <>
                                    <button 
                                        onClick={()=>setdeleteModal({show:true, entriesToDelete:trashEntries.length})}
                                    > 
                                        Delete all 
                                    </button>
                                    <button onClick={recoverAllEntries}> Recover all </button>
                                </>
                                :
                                <>
                                    <button 
                                        onClick={()=>setdeleteModal({show:true, entriesToDelete:selectedEntries.length})}
                                    > 
                                        Delete 
                                    </button>
                                    <button onClick={recoverEntries} > Recover </button>
                                </>
                        }
                    </div>
                }

            </motion.div>

            <AnimatePresence>
                {
                    deleteModal.show && 

                    <DeleteConfirm
                        confirmAction={deleteConfirmAction}
                        setIsActive={setdeleteModal}
                        numberDelete={deleteModal.entriesToDelete}
                    />
                }
            </AnimatePresence>
        </>
    )
}
