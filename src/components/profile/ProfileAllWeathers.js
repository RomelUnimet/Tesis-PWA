import React from 'react'
import '../../scss/profile/profile.scss'

export const ProfileAllWeathers = ({allWeathers}) => {

    const filteredWeathers = allWeathers.filter((w)=>w!=='none');

    let weathers = new Array(11).fill(0);

    const sumWeathers = () =>{
        filteredWeathers.forEach(weather => {
            switch (weather) {
                case 'sunny':
                    weathers[0]=weathers[0]+1;
                    break;
                case 'cloudy':
                    weathers[1]=weathers[1]+1;
                    break;
                case 'cloud':
                    weathers[2]=weathers[2]+1;                
                    break;
                case 'rain':
                    weathers[3]=weathers[3]+1;                
                    break;
                case 'haze':
                    weathers[4]=weathers[4]+1;                
                    break;
                case 'thunder':
                    weathers[5]=weathers[5]+1;                
                    break;
                case 'cloudy-gust':
                    weathers[6]=weathers[6]+1;                
                    break;
                case 'cloudy-windy':
                    weathers[7]=weathers[7]+1;                
                    break;
                case 'dusty':
                    weathers[8]=weathers[8]+1;                
                    break;
                case 'tornado':
                    weathers[9]=weathers[9]+1;                
                    break;
                case 'snow':
                    weathers[10]=weathers[10]+1;                
                    break;
            }
        });
    }
    
    sumWeathers()


    /*
    const orderedComponents = userSettings.order.map(comp => {
        switch (comp) {
            case "photos": 
                return <ProfileAllPhotos key={'photos'} allImg={allImg} />
            case "tags": 
                return <ProfileAllTags key={'tags'}/>
            case "locations": 
                return <ProfileAllLocations key={'locations'}/>
            default:
                return <ProfileAllWeathers key={'weather'} allWeathers={allWeathers} />
        }
    });
    */

    return (
        <div className="profile-all-weather-container">
            <div className="profile-all-weather-topbar">
                <h3>Weather</h3>
            </div>
        </div>
    )
}
