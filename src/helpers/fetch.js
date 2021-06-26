import Localbase from "localbase";

const db = new Localbase('pwa-card-diary');


const baseUrl = process.env.REACT_APP_API_URL;

const fetchNoToken = ( endpoint, data, method='GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;


    if (method === 'GET' ) {

        return fetch( url );

    } else {
        return fetch ( url, {

            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )       
        })
    }
}

const fetchWithToken = async ( endpoint, data, method='GET' ) => {

    
    let tokenData = await db.collection('token').get() || '';
    let token = ''


    if(tokenData.length===0){
        tokenData=''
    }else{
        token = tokenData[0].token
    }
    
     

    const url = `${ baseUrl }/${ endpoint }`;

    if (method === 'GET' ) {

        return fetch( url , {
            method,
            headers: {
                'x-token': token
            },
            
        });

    } else {
        return fetch ( url, {

            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )       
        })
    }
}

export { fetchNoToken ,fetchWithToken };