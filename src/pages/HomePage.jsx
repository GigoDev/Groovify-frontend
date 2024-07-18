import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { StationList } from "../cmps/StationList"
import { loadStations } from '../store/actions/station.actions'

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const homeMainViewRef = useRef(null)

    useEffect(() => {
        loadStations()

    }, [])


    useEffect(() => {
        // console.log("Stations:", stations)
        const handleScroll = () => { }

        const homeMainViewElement = homeMainViewRef.current;
        if (homeMainViewElement) {
            homeMainViewElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (homeMainViewElement) {
                homeMainViewElement.removeEventListener('scroll', handleScroll);
            }
        }
    }, [])

    if (!stations) return <div>Loading...</div>
    return (
        <>
            <section ref={homeMainViewRef} className="home-main-view">

                <StationList stations={stations}/>

            </section>
        </>
    )
}

