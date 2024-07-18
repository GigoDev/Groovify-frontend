import { StationPreview } from "./StationPreview"

export function MiniStationList({ activeStation, setActiveStation, stations }) {
    if (!stations) return <div></div>
    return (
        <section className="mini-stations-container">
            <div className='mini-station-list'>
                {
                    stations.slice(0, 8).map(station => (
                        <div className='mini-station' key={station._id}>
                            <StationPreview
                                station={station}
                                isMini={true}
                                setActiveStation={setActiveStation}
                                activeStation={activeStation}
                            />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}