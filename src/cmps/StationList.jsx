import { StationPreview } from "./StationPreview"

export function StationList({stations}) {
    console.log('stations:',stations)

    if (!stations) return <div>Loading..</div>
    return (
            <ul className='cards-container clean-list'>{
                    stations.map(station => (
                        <li  key={station.id}>
                            <StationPreview station={station}/> 
                        </li>
                    ))
                }
            </ul>
    )
}

