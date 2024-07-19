import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { StationList } from "../cmps/StationList"
import { loadStations } from '../store/actions/station.actions'

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()

    }, [])

    if (!stations) return <div>Loading...</div>
    return (
        <>
            <section  className="home-container">

                <StationList stations={stations}/>

            </section>
        </>
    )
}

