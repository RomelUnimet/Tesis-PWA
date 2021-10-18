import React from 'react'
import { ProfileAllLocations } from '../profile/ProfileAllLocations'
import { ProfileAllPhotos } from '../profile/ProfileAllPhotos'
import { ProfileAllTags } from '../profile/ProfileAllTags'
import { ProfileAllWeathers } from '../profile/ProfileAllWeathers'

export const ProfileSectionFilter = ({element, allImg, ceModalState, allWeathers}) => {


    switch (element) {
        case "photos": 
            return <ProfileAllPhotos key={'photos'} allImg={allImg} />

        case "tags": 
            return <ProfileAllTags key={'tags'}/>
         
        case "locations": 
            return  <ProfileAllLocations key={'locations'} ceModalState={ceModalState} /> //{ !ceModalState && <ProfileAllLocations key={'locations'}}/>
        
        default:
            return <ProfileAllWeathers key={'weather'} allWeathers={allWeathers} />

   }
}
