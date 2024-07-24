import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { StationList } from "../cmps/StationList"
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
                <StationList stations={stations.slice(0,8)}/>
                <FeaturedPlaylist from={0} to={5} title={'List title'}/>
            </section>
        </>
    )
}

