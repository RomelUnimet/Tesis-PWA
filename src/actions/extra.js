import { types } from "../types/types";
import { defineWeather } from "../helpers/defineWeather";
import { storeGeolocation } from "./geolocation";

import Localbase from 'localbase';
import { startCardStore } from "./cards";
import { startEntryStore } from "./entry";
import { startLocationStore } from "./location";
import { startTagStore } from "./tag";
import { startSettingsStore } from "./settings";
import { fetchWithToken } from "../helpers/fetch";


const db = new Localbase('pwa-card-diary');


export const startGetWeather = () => {

    return async (dispatch) =>{

        await navigator.geolocation.getCurrentPosition( async (position) => {

            try {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
    
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
            
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
                const res = await fetch(apiUrl);
                const {weather, wind} = await res.json()
                
                const weatherLabel = defineWeather(weather[0], wind)
    
                dispatch( storeGeolocation({lat:lat, lng:lon}) )
                dispatch( finishStoreWeather(weatherLabel) )
            }catch (e){
                console.log('ERROR ON LOCATION', e)
            }

            

        });
      }
}

const finishStoreWeather = ( weatherLabel ) =>{

    return {
        type: types.weatherStore,
        payload: weatherLabel
    }
}

const auxCardEdate = (entries) => {

    if(entries.length!==0){

        const correctedArray = entries.map((e)=>{
            
                return {
                    ...e,
                    edate: new Date(e.edate), 
                }
        })
        return correctedArray
    }

    return []

}

//ADD ENTRY LOGIC
const addEntryLogic = async ( entry ) => {

    await db.collection('entries').add( entry )

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

    }
      
    //Añadir eid al array de entries del location seleccionado
    if(entry.location!==''){
        //Traer y filtrar el location que esta asociado al Entry
        const locations = await db.collection('locations').get();
        let locationInEntry = locations.filter( loc => entry.location===loc.lid); //Esto tal vez devuelve un arreglo

        //Añadirlo al arreglo y hacer update del valor en IndexedDB

        if(locationInEntry.length!==0){

            locationInEntry[0].entries.push( entry.eid )
    
            await db.collection('locations').doc({ lid: entry.location }).update({
                entries: locationInEntry[0].entries,
            })
        }

    }

      
    //Añadir eid al array de entries de la Card a la que pertenece

    //Traer y filtrar la card que esta asociado al Entry 
    const cards = await db.collection('cards').get();
    let cardOfEntry = cards.filter( card => entry.cid===card.cid);

    //Añadirlo al arreglo y hacer update del valor en IndexedDB
    cardOfEntry[0].entries.push( {
        eid: entry.eid,
        edate: entry.date
    })

    await db.collection('cards').doc({ cid: entry.cid }).update({
        entries: cardOfEntry[0].entries,
    })

}

//UPDATE ENTRY LOGIC SIN LOS DISPATCH

const updateEntryLogic = async (oldEntry, newEntry) => {
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


    }


    //Update logic en Cards
    if( oldEntry.cid !== newEntry.cid ){

        //Obtener los cards y filtrarlos para obtener el oldCard y la newCard
        const cards = await db.collection('cards').get();

        let oldEntryCard = cards.filter( card => oldEntry.cid===card.cid)
        let newEntryCard = cards.filter( card => newEntry.cid===card.cid)

        //OLDCARD Eliminarlo del arreglo y hacer update del valor en IndexedDB
        oldEntryCard[0].entries.splice( oldEntryCard[0].entries.indexOf({eid:oldEntry.eid, edate:oldEntry.date}), 1 )

        await db.collection('cards').doc({ cid: oldEntry.cid }).update({
            entries: oldEntryCard[0].entries,
        })

        //NEWCARD Añadirlo al arreglo y hacer update del valor en IndexedDB
        newEntryCard[0].entries.push( {eid:newEntry.eid, edate:newEntry.date} )

        await db.collection('cards').doc({ cid: newEntry.cid }).update({
            entries: newEntryCard[0].entries,
        })
        

    }

    
}

//POR COMO HICE LA BD HACERLO GENERICO NO SE PUEDE POR EL NOMBRE DEL CAMPO ID
const indexOfTag = (obj, list) => {

    for (let i = 0; i < list.length; i++) {
        if (list[i].tid === obj.tid) {
            return i;
        }
    }
    return -1;
}
const indexOfLocation = (obj, list) => {

    for (let i = 0; i < list.length; i++) {
        if (list[i].lid === obj.lid) {
            return i;
        }
    }
    return -1;
}
const indexOfEntry = (obj, list) => {

    for (let i = 0; i < list.length; i++) {
        if (list[i].eid === obj.eid) {
            return i;
        }
    }
    return -1;
}
const monthDifference = (dt2, dt1) => {

    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff))===0? 0 : (Math.abs(Math.round(diff))-1);

}


export const restoreFromBackupFile = (backupFileJson, userID) => {

    //Agarro las colecciones del BackUp y junto con los datos actuales de IndexedDB creo la nueva coleccion y la meto completa en IndexedDB

    return async (dispatch) =>{

        console.log(backupFileJson)

        //ACOMODAR LOS DATOS DEL BACKUP FILE PARA QUE TENGAN EL UID DEL USUARIO QUE HACE EL RESTORE

        //EL OBJETO JSON COLOCO LAS FECHAS COMO STRINGS ENTONCES LAS TUVIMOS QUE RECONVERTIR
        const cardsBackup = backupFileJson.cards.map((card)=>{ 

            return { 
                    ...card, 
                    uid: userID,
                    entries: auxCardEdate(card.entries)
            } 
        }) 

        //Traemos los cards del IdexedDB del usuario para hacer las sustituciones necesarias de los CID de las entradas
        const auxCardArray = await db.collection('cards').get();

        const entriesBackup = backupFileJson.entries.map((entry)=>{ 

            let correctedDate = new Date(entry.date)
            //Sera la card a la cual perteneceria la entrada
            let [auxCard] = auxCardArray.filter(({year, month})=> ( year===correctedDate.getFullYear() && month===correctedDate.getMonth()))
            
            return { 
                    ...entry, 
                    uid: userID,
                    date: correctedDate, 
                    cid: auxCard.cid,
            } 
        }) 

        
        const locationsBackup = backupFileJson.locations.map((location)=>{ return { ...location, uid: userID } })


        const tagsBackup = backupFileJson.tags.map((tag)=>{ return { ...tag, uid: userID } })

        let userSettingsBackup = {...backupFileJson.userSettings, uid: userID}
        delete userSettingsBackup.__v;
        delete userSettingsBackup._id;

        const startDate = new Date(backupFileJson.startDate);
        //const endDate = new Date(backupFileJson.endDate);

        //Traemos la data que se encuentra en IndexedDB para hacer las comparaciones necesarios y ver que se ingresa o no en la BD
        //TENEMOS QUE TRAER LA DATA PROGRESIVAMENTE MIENTRAS LA VAMOS USANDO

        //Primero traemos Entries, la coleccion mas complicada para utilizar toda su logica y hacer updates a las demas colecciones de IndexedDB
        const auxEntries = await db.collection('entries').get();

        //Nueva coleccion Entries
        let newEntries = auxEntries; 

        for (let i = 0; i < entriesBackup.length; i++) {
            //Si el objeto no esta en el array de entries en indexedDB añadelo
            if(!(newEntries.some((entry)=> entry.eid===entriesBackup[i].eid))){ 

                //Creamos los entries nuevos que vienen del backup con la logica del crear Entry
                //De esta manera hacemos que se actualicen los eid en los tags, locations y cards
                await addEntryLogic(entriesBackup[i])

            }else{

                //HACER UPDATE A LA ENTRADA YA EXISTENTE CON LA LOGICA DE ENTRY UPDATE
                let indexOfSameObj = indexOfEntry(entriesBackup[i], newEntries);

                //Si hay entries que coinciden, nos quedamos con el del backup, haciendo la operacion con la logica de editar entrada
                //De esa manera hacemos los cambios necesarios en los tags, locations y cards
                await updateEntryLogic(newEntries[indexOfSameObj], entriesBackup[i]);

            }
        }

        //TRAEMOS EL RESTO DE LA DATA DE INDEXEDDB AHORA ACTUALIZADA CON LAS ENTRADAS Y LOS EID CORRECTOS EN CADA ELEMENTO
        const entries = await db.collection('entries').get();
        const cards = await db.collection('cards').get();
        const locations = await db.collection('locations').get();
        const tags = await db.collection('tags').get();
        
        //Nueva coleccion Tags
        let newTags = tags;
        
        //Esta cambio porque index siempre es -1
        for (let i = 0; i < tagsBackup.length; i++) {
            //Si el objeto no esta en el array de entries en indexedDB añadelo
            if(!(newTags.some((tag)=> tag.tid===tagsBackup[i].tid))){

                //BASICAMENTE CREAMOS UN TAG NUEVO SI ESTE NO COINCIDE CON NADA DE LO QUE ENCONTRAMOS EN LA BD 
                newTags.push(tagsBackup[i])

            }else{

                //Trae el Index del objeto igual
                let indexOfSameObj = indexOfTag( tagsBackup[i], newTags)       
                
                //Editamos el resto de las propiedades de newTags
                newTags[indexOfSameObj] = {
                    ...newTags[indexOfSameObj],
                    name: tagsBackup[i].name
                }

                //El arreglo de entries ya deberia estar actualizado completamente
            }
        }
        
        //Nueva coleccion Locations
        let newLocations = locations;

        for (let i = 0; i < locationsBackup.length; i++) {
            //Si el objeto no esta en el array de entries en indexedDB añadelo
            if(!(newLocations.some((loc)=> loc.lid===locationsBackup[i].lid))){ 
                
                //BASICAMENTE CREAMOS UN LOCATION NUEVO SI ESTE NO COINCIDE CON NADA DE LO QUE ENCONTRAMOS EN LA BD 
                newLocations.push(locationsBackup[i])

            }else{
                
                //Trae el Index del objeto igual
                let indexOfSameObj = indexOfLocation( locationsBackup[i], newLocations)

                //Editamos el resto de las propiedades de newLocations
                newLocations[indexOfSameObj] = {
                    ...newLocations[indexOfSameObj],
                    name: locationsBackup[i].name,
                    description: locationsBackup[i].description,
                    latitude: locationsBackup[i].latitude,
                    longitude: locationsBackup[i].longitude,
                }
                
                //El arreglo de entries ya deberia estar actualizado completamente
            }
        }
 
        //Nueva coleccion de Cards
        let newCards = cards;

        //Creamos el array auxiliar
        let auxCardArrary = Array.from(Array(monthDifference(startDate, new Date(2020,1,1) )).keys())
        
        //Le ingresamos las cards del backup
        auxCardArrary.push(...cardsBackup)

        for (let i = 0; i < auxCardArrary.length; i++) {
            //Chequeamos si es un dummy o si debemos hacer el cambio
            if(auxCardArrary[i].cid){

                newCards[i] = {
                    ...newCards[i],
                    color: auxCardArrary[i].color,
                    photo: auxCardArrary[i].photo,
                    //entries => ya debe de estar completamente actualizado 
                }

            }
        }


        //ACTUALIZAR LOS DATOS EN TODAS LAS COLECCIONES DE INDEXEDDB (menos token y backupdata)
        await db.collection('cards').delete()
        for (let i = 0; i < newCards.length; i++) {
            await db.collection('cards').add(newCards[i])
        }
        
        //Yo creo que no tengo que hacer esto ya que todo esta actualizado
        //await db.collection('entries').set([ ...entries ])

        //POR ALGUNA RAZON LOCALBASE NO ME DEJA HACER SET EN ESTOS DOCUMENTOS ENTONCES BORRARE LA COLLECCION Y LA CREO DENUEVO (que seguro es lo que hacer ellos)
        await db.collection('locations').delete()
        for (let i = 0; i < newLocations.length; i++) {
            await db.collection('locations').add(newLocations[i])
        }
        
        await db.collection('tags').delete()
        for (let i = 0; i < newTags.length; i++) {
            await db.collection('tags').add(newTags[i])
        }

        await db.collection('userSettings').delete()
        await db.collection('userSettings').add(userSettingsBackup)


        //HACER EL STORE EN REDUX
        dispatch(startCardStore() )
        dispatch(startEntryStore() )
        dispatch(startLocationStore() )
        dispatch(startTagStore() )
        dispatch(startSettingsStore() )

        const restoreData = {
            cards: newCards,
            entries: entries,
            locations: newLocations,
            tags: newTags,
            userSettings: userSettingsBackup,
        }

        console.log(restoreData)
        
        fetchWithToken('restore', restoreData, 'PUT');

    }
}

/*
return async (dispatch) =>{

        //ACOMODAR LOS DATOS DEL BACKUP FILE PARA QUE TENGAN EL UID DEL USUARIO QUE HACE EL RESTORE

        //EL OBJETO JSON COLOCO LAS FECHAS COMO STRINGS ENTONCES LAS TUVIMOS QUE RECONVERTIR
        const cards = backupFileJson.cards.map((card)=>{ 
            return { 
                    ...card, 
                    uid: userID,
                    //hacer una funcion que si entries sea igual a 0 entonces retorne un arreglo vacio
                    entries: auxCardEdate(card.entries)
                } 
        }) 


        const entries = backupFileJson.entries.map((entry)=>{ 
            return { 
                    ...entry, 
                    uid: userID,
                    date: new Date(entry.date), 
                } 
        }) 
        
        const locations = backupFileJson.locations.map((location)=>{ return { ...location, uid: userID } })

        const tags = backupFileJson.tags.map((tag)=>{ return { ...tag, uid: userID } })
        
        let userSettings = {...backupFileJson.userSettings, uid: userID}
        delete userSettings.__v;
        delete userSettings._id;

    
        //ACTUALIZAR LOS DATOS EN TODAS LAS COLECCIONES DE INDEXEDDB (menos token y backupdata)
        await db.collection('cards').set([ ...cards ])
        await db.collection('entries').set([ ...entries ])


        //POR ALGUNA RAZON LOCALBASE NO ME DEJA HACER SET EN ESTOS DOCUMENTOS ENTONCES BORRARE LA COLLECCION Y LA CREO DENUEVO (que seguro es lo que hacer ellos)
        await db.collection('locations').delete()
        for (let i = 0; i < locations.length; i++) {
            await db.collection('locations').add(locations[i])
        }
        
        
        await db.collection('tags').delete()
        for (let i = 0; i < tags.length; i++) {
            await db.collection('tags').add(tags[i])
        }
        
        await db.collection('userSettings').delete()
        await db.collection('userSettings').add(userSettings)
        
        //HACER EL STORE EN REDUX
        dispatch(startCardStore() )
        dispatch(startEntryStore() )
        dispatch(startLocationStore() )
        dispatch(startTagStore() )
        dispatch(startSettingsStore() )

        
        //HACER EL LLAMADO A LA BD PARA ACTUALIZAR AHI

        const restoreData = {
            cards: cards,
            entries: entries,
            locations: locations,
            tags: tags,
            userSettings: userSettings,
        }
        
        fetchWithToken('restore', restoreData, 'PUT');

      }
*/

