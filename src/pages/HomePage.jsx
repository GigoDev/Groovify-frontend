import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { MiniStationList } from "../cmps/MiniStationList"
import { loadStations } from '../store/actions/station.actions'
import { FeaturedPlaylist } from '../cmps/FeaturedPlaylist'
import { FastAverageColor } from 'fast-average-color'

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)



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

    if (!stations) return <div>Loading...</div>
    return (
        <>
            <section className="home-container">
                <MiniStationList stations={stations.slice(0, 8)} extractColor={extractColor} />
                <FeaturedPlaylist title={'Top playlists'} from={0} to={7} type={'playlist'} />
                <FeaturedPlaylist title={'Recommanded for you'} from={7} to={14} type={'playlist'} />
                <FeaturedPlaylist title={'Your favorite artists'} from={0} to={7} type={'artist'} isRound={true} />
                <FeaturedPlaylist title={'Mood'} from={14} to={21} type={'playlist'} />
            </section>
        </>
    )
}

