import Localbase from "localbase";
import { generateID } from "./generateId";

const db = new Localbase('pwa-card-diary');

const getBackupData = async ( startDate, endDate) => {

    //AQUI FALTO USER SETTINGS

    //Traer toda la Data necesaria de Indexed DB
    const cards = await db.collection('cards').get();
    const entries = await db.collection('entries').get();
    const locations = await db.collection('locations').get();
    const tags = await db.collection('tags').get();
    const userSettings = await db.collection('userSettings').get();

    //Filtrar la Data por Fecha o si esta en las entradas que se hacen BackUp 
    let filteredCards = cards.filter(({year, month}) => ( 
                                            year>=startDate.getFullYear() &&
                                            year<=endDate.getFullYear() &&
                                            month>=startDate.getMonth() &&
                                            month<=endDate.getMonth() 
                                        )
    )

    let filteredEntries = entries.filter(({date}) => (date>=startDate && date<=endDate))

    let filteredLocations = locations.filter(({ lid }) => filteredEntries.some((e)=> e.location===lid))

    let filteredTags = tags.filter(({ tid }) => filteredEntries.some((e)=>e.tags.includes(tid)) )


    //Cambios necesarios a los arrays de entries en Cards-Tags-Locations
    filteredCards = filteredCards.map( ({ entries, ...element  })=>{
        let entrieArrayFilter = entries.filter(({ eid }) => filteredEntries.some((e)=> e.eid===eid) ) 
        let filteredCard = {
            ...element,
            entries: entrieArrayFilter
        }
        return filteredCard
    })


    filteredLocations = filteredLocations.map(({entries, ...element})=> {
        let entrieArrayFilter = entries.filter((loc_eid)=>filteredEntries.some((e)=> e.eid===loc_eid))
        let filteredLocation = {
            ...element,
            entries: entrieArrayFilter
        }
        return filteredLocation
    } )

    filteredTags = filteredTags.map(({entries, ...element})=> {
        let entrieArrayFilter = entries.filter((tag_eid)=>filteredEntries.some((e)=> e.eid===tag_eid))
        let filteredTag = {
            ...element,
            entries: entrieArrayFilter
        }
        return filteredTag
    } )

    //Reunimos todos los Datos y creamos el JSON

    const backupCard = filteredCards.map(( { uid, ...element } )=> element) 
    const backupEntries = filteredEntries.map(( { uid, ...element } )=> element) 
    const backupLocations = filteredLocations.map(( { uid, ...element } )=> element) 
    const backupTags = filteredTags.map(( { uid, ...element } )=> element) 
    const backupUserSettings = userSettings.map(( { uid, ...element } )=> element) 

    const start = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
    const end = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;

    const backUpData = {
        backId: generateID(),
        cards: backupCard,
        entries: backupEntries,
        locations: backupLocations,
        tags: backupTags,
        userSettings: backupUserSettings[0],
        backupName: `Carddiary-${start}-${end}`,
        dateCreated: new Date(),
        startDate: startDate,
        endDate: endDate,
    }
    
    await db.collection('backUpData').add({ ...backUpData })
    
    console.log(backUpData)

    return backUpData;
}


export {getBackupData};

/*
    
    const backupCard = cards.map(( { uid, ...element } )=> element) 
    const backupEntries = entries.map(( { uid, ...element } )=> element) 
    const backupLocations = locations.map(( { uid, ...element } )=> element) 
    const backupTags = tags.map(( { uid, ...element } )=> element) 
    const backupUserSettings = userSettings.map(( { uid, ...element } )=> element) 

    const start = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
    const end = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;

    const backUpData = {
        backId: generateID(),
        cards: backupCard,
        entries: backupEntries,
        location: backupLocations,
        tags: backupTags,
        userSettings: backupUserSettings[0],
        backupName: `Carddiary-${start}-${end}`,
        dateCreated: new Date(),
    }

    await db.collection('backUpData').add({ ...backUpData })

    return backUpData;
    */
