import Localbase from "localbase";
import { generateID } from "./generateId";


const getBackupData = async ( startDate, endDate) => {

    const db = new Localbase('pwa-card-diary');

    const cards = await db.collection('cards').get();
    const entries = await db.collection('entries').get();
    const locations = await db.collection('locations').get();
    const tags = await db.collection('tags').get();
    const userSettings = await db.collection('userSettings').get();
    
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
}


export {getBackupData};
