import React from 'react'
import { useSelector } from 'react-redux'
import '../../scss/profile/profile.scss'

export const ProfileAllLocations = () => {

    const {locations} = useSelector(state => state.locations)

    return (
        <div className="profile-all-locations-container">
            <div className="profile-all-topbar">

                <h3>Location</h3>

                <div className="number-arrow-container">

                    <h4> {locations.length} </h4>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
            </div>
        </div>
    )
}
