import { StationPreview } from "./StationPreview"

export function MiniStationList({ activeStation, setActiveStation, stations }) {
    if (!stations) return <div></div>
    return (
        <section className="mini-stations-container">
            <div className='mini-station-list'>
                {
                    stations.map(station => (
                        <div className='mini-station' key={station._id}>
                            <button
                                className={`preview-play-btn`}>
                                <svg width='24' height='24' viewBox="0 0 24 24">
                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                                    </path>
                                </svg>
                            </button >
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