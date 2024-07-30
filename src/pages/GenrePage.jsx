import { useParams } from 'react-router'
import { FeaturedPlaylist } from '../cmps/FeaturedPlaylist'
import { spotifyService } from '../services/spotify.service'
import { useEffect, useState } from 'react'
import SpotifyLoader from '../assets/gifs/SpotifyLoader.gif'

export function GenrePage() {
    const { label, color: bgColor } = useParams()
    const [data, setData] = useState(null)
    
    useEffect(() => {
        async function fetchData() {
            if (!data) {
                var category = label
                if (category === 'R&B') category = 'rnb'
                if (category === 'Hip-Hop') category = 'hip-hop'
                if (category === 'K-pop') category = 'kpop'
                const playlists = await spotifyService.getCategoryPlaylists(category)
                setData(playlists)
            }
        }
        fetchData()

        return () => {
            setData(null)
        }

    }, []);


    if(!data) return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
    return (
        <section
            className="genre-page-container full-details"
            style={{ background: `linear-gradient(${bgColor} 0%, rgb(18, 18, 18) 30%,rgb(18, 18, 18) 100%)` }}>
            <section className="genre-header">
                <h1 className="genre-title">{label}</h1>
            </section>

            <section className="genre-content"
                style={{ background: `linear-gradient(${bgColor} -50%, rgb(18, 18, 18) 30%,rgb(18, 18, 18) 100%)` }}>
                <FeaturedPlaylist stations={data} title={'Popular'} startIdx={0} type={'playlist'} />
                <FeaturedPlaylist stations={data} title={'Hand-picked'} startIdx={7} type={'playlist'} />
                <FeaturedPlaylist stations={data} title={'From our editors'} startIdx={14} type={'playlist'} />



            </section>
        </section>
    )
}