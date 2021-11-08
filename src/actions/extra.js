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

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            const res = await fetch(apiUrl);
            const {weather, wind} = await res.json()
            
            const weatherLabel = defineWeather(weather[0], wind)

            dispatch( storeGeolocation({lat:lat, lng:lon}) )
            dispatch( finishStoreWeather(weatherLabel) )

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


export const restoreFromBackupFile = (backupFileJson, userID) => {

    return async (dispatch) =>{

        //ACOMODAR LOS DATOS DEL BACKUP FILE PARA QUE TENGAN EL UID DEL USUARIO QUE HACE EL RESTORE

        //EL OBJETO JSON COLOCO LAS FECHAS COMO STRINGS ENTONCES LAS TUVIMOS QUE RECONVERTIR
        const cards = backupFileJson.cards.map((card)=>{ 
            return { 
                    ...card, 
                    uid: userID,
                    //hacer una funcion que si entreis sea igual a 0 entonces retorne un arreglo vacio
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
        
        const locations = backupFileJson.location.map((location)=>{ return { ...location, uid: userID } })

        const tags = backupFileJson.tags.map((tag)=>{ return { ...tag, uid: userID } })
        
        let userSettings = {...backupFileJson.userSettings, uid: userID}
        delete userSettings.__v;
        delete userSettings._id;

    
        //ACTUALIZAR LOS DATOS EN TODAS LAS COLECCIONES DE INDEXEDDB (menos token y backupdata)
        await db.collection('cards').set([ ...cards ])
        await db.collection('entries').set([ ...entries ])


        //POR ALGUNA RAZON LOCALBASE NO ME DEJA HACER SET EN ESTOS DOCUMENTOS ENTONCES BORRARE LA COLLECCION Y LA CREO DENUEVO (que seguro es loq ue hacer ellos)
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
}

