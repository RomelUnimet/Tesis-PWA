import React from 'react'

export const TrashEntry = ( {entry, selectedEntries, setselectedEntries,select} ) => {

    const { eid, photos, date, title, text} = entry;

    const dateText = () =>{
        
        let shortMonthName = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        let shortDayName = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
        return `${shortDayName}. ${shortMonthName} ${date.getDate()} / ${date.getFullYear()}`
    }

    let bImgStyles;

    if(photos.length!==0){
        const [thumbnailPhoto] = photos.filter((photo)=> photo?.thumbnail===true)

        bImgStyles = {
            backgroundImage: `url(${thumbnailPhoto.photo})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',   
        }
    }

    const isSelected = (eid) => {
        return selectedEntries.includes(eid)
    }

    const toggleSelectedEntry = (eid) => {

        let auxArray = selectedEntries;

        if (selectedEntries.includes(eid)){

            auxArray.splice(auxArray.indexOf(eid), 1);
            setselectedEntries([...auxArray])

        } else {

            auxArray.push(eid);
            setselectedEntries([...auxArray])
        }

        console.log(auxArray)
    }


    return (
        <div className="trash-entry-tabs"
             style={ photos.length===0?  {} : bImgStyles}

             onClick={()=>{

                   if(select) toggleSelectedEntry(eid)
            }}
        >
            {
                photos.length===0?

                <div className="text-positioning">

                    {   
                        title!=="" &&

                        <h3> {title} </h3>
                    }

                    {
                        text!=="" &&

                        <p> {text} </p>
                    }

                    <h4 > {dateText()} </h4>

                </div>

                :
            
                <div className="tags-positioning">

                    <h4 > {dateText()} </h4>

                    {
                        photos.length>1 &&
                        <h4 > +{photos.length-1} </h4>
                    }
                </div>
                
            
            }

            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style={ isSelected(eid)? {opacity:1} : {opacity:0} }
            >
                <rect width="32" height="32" rx="16" fill="#3CDAFD"/>
                <path d="M7 16.25L13.25 22.5L23.6666 10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            
        </div>
    )
}
