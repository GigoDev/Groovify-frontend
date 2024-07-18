import { useState, useEffect } from 'react'
import { spotifyService } from "../services/spotify.service"
// const list = spotifyService.getFeaturedPlaylists()

export function StationPreview({ station}) {
    const [previews, setPreviews] = useState([])
    useEffect(() =>{
        loadList()
    }, [])
    console.log('hi')
    
    async function loadList(){
        // const list = spotifyService.getFeaturedPlaylists()
        try{
            const list = await spotifyService.getFeaturedPlaylists()
            console.log(list)
            setPreviews(list)
        }
        catch(error){
            console.error('Error in fetching popular artists:', error)
        }
    }
    return (
        <article className="station-preview">
            <div className="img-container">
                {/* <img className="station-img" src={previews.imgUrl} alt={`${station.name}`} /> */}
            </div>

            <div className="station-content">
                {/* <h3 className="station-name">{station.name}</h3>
                <h5 className="station-desc">{station.desc}</h5> */}
            </div>
        </article>
    )
}