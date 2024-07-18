import { useState } from 'react'



import { StationList } from './StationList'
import { MiniStationList } from './MiniStationList'

export function MainStationList({ stations, listName, amount, type }) {
    const [activeStation, setActiveStation] = useState(null)

    if (!stations) return <div>Loading...</div>

    return (
        <>
            {type === 'big' &&
                <StationList
                    activeStation={activeStation}
                    setActiveStation={setActiveStation}
                    stations={stations}
                    listName={listName}
                    amount={amount}
                />}
            {type === 'mini' &&
                <MiniStationList
                    activeStation={activeStation}
                    setActiveStation={setActiveStation}
                    stations={stations}
                />}
        </>
    )
}