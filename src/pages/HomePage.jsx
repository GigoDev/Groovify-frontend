import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { MiniStationList } from "../cmps/MiniStationList"
import { setPlayingStation, setTrack, togglePlay } from '../store/actions/station.actions'
import { FeaturedPlaylist } from '../cmps/FeaturedPlaylist'
import { FastAverageColor } from 'fast-average-color'
import SpotifyLoader from '../assets/gifs/SpotifyLoader.gif'


export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)

    useEffect(() => {
        document.body.style.setProperty('--bg-color', '#121212')
    }, [])

    async function extractColor(stationImgUrl) {
        if (!stationImgUrl) return
        const fac = new FastAverageColor()
        try {
            const color = await fac.getColorAsync(stationImgUrl)
            document.body.style.setProperty('--bg-color', [color.hex])

        } catch (error) {
            console.error('Error extracting color:', error)
        }
    }

    function onPlay(ev, track, station) {
        ev.stopPropagation()
        ev.preventDefault()
        
        if (track.spotifyId === currTrack.spotifyId) return togglePlay()
        console.log('not the same track')
        setTrack(track)
        setPlayingStation(station)
    }


    if (!stations) return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
    return (
        <>
            <section className="home-container">
                <MiniStationList stations={stations.slice(0, 8)} extractColor={extractColor} onPlay={onPlay}  />
                <FeaturedPlaylist title={'Top playlists'} from={0} to={10} type={'playlist'} />
                <FeaturedPlaylist title={'Recommanded for you'} from={7} to={14} type={'playlist'} />
                <FeaturedPlaylist title={'Your favorite artists'} from={0} to={7} type={'artist'} isRound={true} />
                <FeaturedPlaylist title={'Mood'} from={14} to={21} type={'playlist'} />
            </section>
        </>
    )
}

