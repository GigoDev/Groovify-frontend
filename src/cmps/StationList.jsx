import { StationPreview } from "./StationPreview"

export function StationList({stations}) {
    console.log('stations:',stations)

    if (!stations) return <div>Loading..</div>
    return (
        <section className="mini-stations-container">
            <h1>StationList CMP</h1>
            <div className='mini-station-list'>{
                    stations.map(station => (
                        <div className='mini-station' key={station.id}>
                            <StationPreview station={station}/> 
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

