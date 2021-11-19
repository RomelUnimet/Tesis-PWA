import { generateID } from "./generateId";

const str2ab = (str) => {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

const creteOptionsObject = ()=> {


    let challengeString = generateID()
    
        const optionsFromServer = {

            challenge: str2ab(challengeString), // need to convert to ArrayBuffer
            rp: { // my website info
                name: "PWA Card Diary Tesis",
                id: window.location.hostname  
            },
            user: { // user info
                name: "pwa_card_diary_user@gmail.com",                  
                displayName: "Usuario_PWA_Card_Diary",
                id: str2ab('ABCDEFGHIJKLMNOP') // need to convert to ArrayBuffer
            },
            pubKeyCredParams: [
                {
                "type": "public-key",
                "alg": -7 // Accepted Algorithm
                }
            ],

            //MABE JUGAR UN POCO CON LAS OPCIONES AVANZADAS DE WEBAUTHN
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                requireResidentKey: false,
                userVerification: "discouraged"
            },
            timeout: 60000 // in milliseconds
        };

    return optionsFromServer;
}

export {creteOptionsObject};

