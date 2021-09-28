import React from 'react'
import '../../scss/profile/profile.scss'

export const ProfileAllPhotos = ({allImg}) => {

    const numberImgs = allImg.length;
    const [firstPhoto] = allImg.slice(-1);
    const smallPhotos = allImg.slice(-5,-1);

    return (
        <div className="profile-all-photos-container">
            <div className="profile-all-topbar">

                <h3>Photos</h3>

                <div className="number-arrow-container">

                    <h4> {numberImgs} </h4>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
            </div>
            
            <div className="profile-all-photos">

                <div className="profile-all-photos-first" style={{backgroundImage: `url(${firstPhoto.photo})`}}/>
                    
                <div className="profile-all-photos-latter">
                    {
                        smallPhotos.map((photo, index)=>(
                            <div key={index} 
                                 style={index===3? {backgroundImage: `url(${photo.photo})`, borderBottomRightRadius:'10px'} : {backgroundImage: `url(${photo.photo})`}}
                                 className="profile-all-small-photo"
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )


}
