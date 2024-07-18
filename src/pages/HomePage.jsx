import { MainStationList } from "../cmps/MainStationList"
import { useMediaQuery } from "@mui/material"
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'

export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const width6 = useMediaQuery('(min-width: 1650px)')
    const width5 = useMediaQuery('(min-width: 1480px')
    const width4 = useMediaQuery('(min-width: 1300px)')
    const width3 = useMediaQuery('(min-width: 1100px)')
    const width2 = useMediaQuery('(min-width: 960px)')
    const width1 = useMediaQuery('(min-width: 850px)')
    
    const amount = getAmount(width6, width5, width4, width3, width2, width1)
    const homeMainViewRef = useRef(null)
    function getAmount(width6, width5, width4, width3, width2, width1) {
        if (width6) return 8
        else if (width5) return 7
        else if (width4) return 6
        else if (width3) return 5
        else if (width2) return 4
        else if (width1) return 3
        else return 2
    }
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
{/* 
                <MainStationList
                    stations={stations2}
                    type={'mini'}
                /> */}

                <MainStationList
                    stations={stations1}
                    listName={'Made for you'}
                    amount={amount}
                    type={'big'}
                />


                <MainStationList
                    stations={stations3}
                    listName={'User favorites'}
                    amount={amount}
                    type={'big'}
                />

                <MainStationList
                    stations={stations4}
                    listName={'Your top mixes'}
                    amount={amount}
                    type={'big'}
                />
            </section>
        </>
    )
}

