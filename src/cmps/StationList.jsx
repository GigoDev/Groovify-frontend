import { StationPreview } from './StationPreview'

export function StationList({ activeStation, setActiveStation, stations, listName, amount }) {
    if (!stations) return <div>Loading...</div>
    return (
        <section className='main-stations-container'>
            <div className="station-list-name">{listName}</div>
            <section className="station-list-container">
                {
                    stations.slice(0, amount).map(station => (
                        <div className='station-list-item' key={station._id}>
                            <StationPreview
                                station={station}
                                isMini={false}
                                setActiveStation={setActiveStation}
                                activeStation={activeStation}
                            />
                        </div>
                    ))
                }
            </section>
        </section>
    )
}