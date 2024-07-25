import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { MiniStationList } from "../cmps/MiniStationList"
import { loadStations } from '../store/actions/station.actions'
import { FeaturedPlaylist } from '../cmps/FeaturedPlaylist'

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()

    }, [])

    if (!stations) return <div>Loading...</div>
    return (
        <>
            <section  className="home-container">
                <MiniStationList stations={stations.slice(0,8)}/>
                <FeaturedPlaylist from={0} to={7} title={'Top playlists'}/>
                <FeaturedPlaylist from={7} to={14} title={'Recommanded for you'}/>
                <FeaturedPlaylist from={14} to={21} title={'Mood'}/>
                {/* <FeaturedPlaylist from={18} to={24} title={'List title3'}/> */}
            </section>
        </>
    )
}

