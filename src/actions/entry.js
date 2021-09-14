import { fetchWithToken } from '../helpers/fetch';  
import { types } from '../types/types'

import Localbase from 'localbase';
import { startLocationStore } from './location';
import { startTagStore } from './tag';
import { startCardStore } from './cards';


const db = new Localbase('pwa-card-diary');

export const startEntryStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error
        const entries = await db.collection('entries').get();

        dispatch( finishEntryStore( entries ) );
    }
}

//Ver que funcione con la nueva funcion
export const entryCreate = ( entry ) => {

    return async (dispatch) => {

        await db.collection('entries').add( entry )

        await addEidToCardTagLocation()
 
        fetchWithToken(`entry/new`, entry , 'POST');
        
        dispatch(startEntryStore())      
           
    }
}

export const entryUpdate = ( oldEntry, newEntry ) => {

    return async (dispatch) => {

        //Maybe validacion de que sean la misma entry
        await db.collection('entries').doc({ eid: oldEntry.eid }).update(newEntry)
        

        //Update logic en los Tags
        if(oldEntry.tags!==newEntry.tags){

            //Traer los tags
            const tags = await db.collection('tags').get()

            //Filtar los tags que se encuentran en la Old y New entry y separar los unselected de los newSelected
            let unselectedTagsFromEntry = oldEntry.tags.filter( oldEid => !newEntry.tags.includes( oldEid ) ) //retorna elementos en Old que no estan en new
            let newSelectedTagsFromEntry = newEntry.tags.filter( newEid => !oldEntry.tags.includes( newEid ) ) //retorna elementos en new que no estan en old

            let tagsUnselected = tags.filter( tag => unselectedTagsFromEntry.includes(tag.tid) )
            let tagsSelectedNew = tags.filter( tag => newSelectedTagsFromEntry.includes(tag.tid) )
            //AQUI EN VERDAD NO TENGO LOS TAGS


            for (let index = 0; index < tagsUnselected.length; index++) {
                
                //Quitar eid del array de entries y guardar el cambio
                tagsUnselected[index].entries.splice( tagsUnselected[index].entries.indexOf(oldEntry.eid) ,1 )

                await db.collection('tags').doc({ tid: tagsUnselected[index].tid }).update({
                    entries: tagsUnselected[index].entries,
                })

            }

            for (let index = 0; index < tagsSelectedNew.length; index++) {
                
                //Añadirlo al arreglo y hacer update del valor en IndexedDB
                tagsSelectedNew[index].entries.push( newEntry.eid )

                await db.collection('tags').doc({ tid: tagsSelectedNew[index].tid }).update({
                    entries: tagsSelectedNew[index].entries,
                })

            }

            dispatch(startTagStore())
        }

        //Update Logic en Locations
        if( oldEntry.location !== newEntry.location){

            //Obtener los location 
            const locations = await db.collection('locations').get();

            //Hacer cambios en el oldLocation (si es que lo tiene)
            if(oldEntry.location!=='') {
                
                //filtro del location necesario
                let oldLocation = locations.filter( location => location.lid===oldEntry.location )

                //Eliminarlo del arreglo y hacer update del valor en IndexedDB
                oldLocation[0].entries.splice( oldLocation[0].entries.indexOf(oldEntry.eid), 1 )

                await db.collection('locations').doc({ lid: oldEntry.location }).update({
                    entries: oldLocation[0].entries,
                })

            }

            //Hacer cambios en el newLocation (si es que lo tiene)
            if(newEntry.location!==''){

                //filtro del location necesario
                let newLocation = locations.filter( location => location.lid===newEntry.location )

                //Añadirlo al arreglo y hacer update del valor en IndexedDB
                newLocation[0].entries.push( newEntry.eid )

                await db.collection('locations').doc({ lid: newEntry.location }).update({
                    entries: newLocation[0].entries,
                })
            }

            dispatch(startLocationStore())

        }


        //Update logic en Cards
        if( oldEntry.cid !== newEntry.cid ){

            //Obtener los cards y filtrarlos para obtener el oldCard y la newCard
            const cards = await db.collection('cards').get();

            let oldEntryCard = cards.filter( card => oldEntry.cid===card.cid)
            let newEntryCard = cards.filter( card => newEntry.cid===card.cid)

            //OLDCARD Eliminarlo del arreglo y hacer update del valor en IndexedDB
            oldEntryCard[0].entries.splice( oldEntryCard[0].entries.indexOf(oldEntry.eid), 1 )

            await db.collection('cards').doc({ cid: oldEntry.cid }).update({
                entries: oldEntryCard[0].entries,
            })

            //NEWCARD Añadirlo al arreglo y hacer update del valor en IndexedDB
            newEntryCard[0].entries.push( newEntry.eid )

            await db.collection('cards').doc({ cid: newEntry.cid }).update({
                entries: newEntryCard[0].entries,
            })
            
            dispatch(startCardStore())

        }

        fetchWithToken(`entry/${newEntry.eid}`, newEntry, 'PUT');
        
        dispatch(startEntryStore())   
    }
}

//Testear que funciona con la nueva funciona
export const entryDelete = ( entry ) => {

    return async (dispatch) => {

        await db.collection('entries').doc({ eid: entry.eid }).delete()

        await deleteEidFromCardTagLocation( entry )
        
        fetchWithToken(`entry/delete/${entry.eid}`, {}, 'DELETE');
        
        dispatch(startEntryStore())   
    }
}

export const trashEntry = ( entry ) => {

    return async ( dispatch ) => {

        await db.collection('entries').doc({ eid: entry.eid }).update({
            trash: true,
        })

        await deleteEidFromCardTagLocation( entry )

        fetchWithToken(`entry/trash/${entry.eid}`, entry, 'PUT');
        
        dispatch(startEntryStore())   

    }
}

export const unTrashEntry = ( entry ) => {

    return async ( dispatch ) => {

        await db.collection('entries').doc({ eid: entry.eid }).update({
            trash: false,
        })

        await addEidToCardTagLocation( entry )

        fetchWithToken(`entry/untrash/${entry.eid}`, entry, 'PUT');
        
        dispatch(startEntryStore())   

    }
}

const finishEntryStore = ( locations ) =>{

    return {
        type: types.entriesStore,
        payload: locations
    }
}


const addEidToCardTagLocation = async (entry) =>{

    //Añadir eid a todos los arrays de entries de los tags seleccionados
    if(entry.tags.length!==0) {
        //Traer y filtrar los Tags
        const tags = await db.collection('tags').get()
        let tagsInEntry = tags.filter( tag => entry.tags.includes(tag.tid));

        //Por cada tag en el Entry creado se le añade el eid al arreglo de entries 
        for (let index = 0; index < tagsInEntry.length; index++) {
            
            //Añadirlo al arreglo y hacer update del valor en IndexedDB
            tagsInEntry[index].entries.push( entry.eid )

            await db.collection('tags').doc({ tid: tagsInEntry[index].tid }).update({
                entries: tagsInEntry[index].entries,
            })

        }

        dispatch(startTagStore())
    }
      
    //Añadir eid al array de entries del location seleccionado
    if(entry.location!==''){
        //Traer y filtrar el location que esta asociado al Entry
        const locations = await db.collection('locations').get();
        let locationInEntry = locations.filter( loc => entry.location===loc.lid); //Esto tal vez devuelve un arreglo

        //Añadirlo al arreglo y hacer update del valor en IndexedDB
        locationInEntry[0].entries.push( entry.eid )

        await db.collection('locations').doc({ lid: entry.location }).update({
            entries: locationInEntry[0].entries,
        })

        dispatch(startLocationStore()) 
    }

      
    //Añadir eid al array de entries de la Card a la que pertenece

    //Traer y filtrar la card que esta asociado al Entry 
    const cards = await db.collection('cards').get();
    let cardOfEntry = cards.filter( card => entry.cid===card.cid);

    //Añadirlo al arreglo y hacer update del valor en IndexedDB
    cardOfEntry[0].entries.push( entry.eid )

    await db.collection('cards').doc({ cid: entry.cid }).update({
        entries: cardOfEntry[0].entries,
    })

    dispatch(startCardStore())
}



const deleteEidFromCardTagLocation = async ( entry ) => {

//Aplicar Logica del Delete en los tags locations y cards

        //Quitar el eid del arreglo de entries de los tags asociados
        if(entry.tags.length!==0) {
            //Traer y filtrar los Tags
            const tags = await db.collection('tags').get()
            let tagsInEntry = tags.filter( tag => entry.tags.includes(tag.tid));

            //Por cada tag en el Entry creado se elimina el eid al arreglo de entries 
            for (let index = 0; index < tagsInEntry.length; index++) {
                
                //Quitar eid del array de entries y guardar el cambio
                tagsInEntry[index].entries.splice( tagsInEntry[index].entries.indexOf(entry.eid) ,1 )

                await db.collection('tags').doc({ tid: tagsInEntry[index].tid }).update({
                    entries: tagsInEntry[index].entries,
                })

            }

            dispatch(startTagStore())
        }

        //Quitar el eid del arreglo de entries del locaiton seleccionado
        if(entry.location!==''){
            //Traer y filtrar el location que esta asociado al Entry
            const locations = await db.collection('locations').get();
            let locationInEntry = locations.filter( loc => entry.location===loc.lid); 

            //Eliminarlo del arreglo y hacer update del valor en IndexedDB
            locationInEntry[0].entries.splice( locationInEntry[0].entries.indexOf(entry.eid), 1 )

            await db.collection('locations').doc({ lid: entry.location }).update({
                entries: locationInEntry[0].entries,
            })

            dispatch(startLocationStore()) 
        }

        //Quitar el eid del arreglo de entries de la card asociada
        //Traer y filtrar la card que esta asociado al Entry 
        const cards = await db.collection('cards').get();
        let cardOfEntry = cards.filter( card => entry.cid===card.cid);

        //Eliminarlo del arreglo y hacer update del valor en IndexedDB
        cardOfEntry[0].entries.splice( cardOfEntry[0].entries.indexOf(entry.eid), 1 )

        await db.collection('cards').doc({ cid: entry.cid }).update({
            entries: cardOfEntry[0].entries,
        })

        dispatch(startCardStore())

}





