import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { MiniStationList } from "../cmps/MiniStationList"

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    
    const homeMainViewRef = useRef(null)
    
    useEffect(() => {
        console.log("Stations:", stations)
        const handleScroll = () => {}

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

    const stations1 = stations.slice(0, 8)
    const stations2 = stations.slice(9, 17)
    const stations3 = stations.slice(18, 26)
    const stations4 = stations.slice(27, 35)

    return (
        <>
            <section ref={homeMainViewRef} className="home-main-view">

                <MiniStationList
                    stations={stations2}
                />

                {/* <MainStationList
                    stations={stations1}
                    listName={'Made for you'}
                    type={'big'}
                />


                <MainStationList
                    stations={stations3}
                    listName={'User favorites'}
                    type={'big'}
                />

                <MainStationList
                    stations={stations4}
                    listName={'Your top mixes'}
                    type={'big'}
                /> */}
            </section>
        </>
    )
}

