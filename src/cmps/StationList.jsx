import { StationPreview } from './StationPreview'

export function StationList({ activeStation, setActiveStation, stations, listName, amount }) {
    if (!stations) return <div>Loading...</div>

    return (
        <section className='main-stations-container'>
            <h1>Station list CMP</h1>
            <div className="station-list-name">{listName}</div>
            <section className="station-list-container">
                {
                    stations.map(station => (
                        <div className='station-list-item' key={station._id}>

                            <button
                                className={`preview-play-btn`}>
                                <svg width='24' height='24' viewBox="0 0 24 24">
                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                                    </path>
                                </svg>
                            </button >
                            
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