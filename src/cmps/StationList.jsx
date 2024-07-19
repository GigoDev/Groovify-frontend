import { StationPreview } from "./StationPreview"
import { Link } from 'react-router-dom';


export function StationList({stations}) {

    if (!stations) return <div>Loading..</div>
    return (
            <ul className='cards-container clean-list'>{
                    stations.map(station => (
                        <Link to={`station/${station.id}`} key={station.id}>
                            <StationPreview station={station}/> 
                        </Link>
                    ))
                }
            </ul>
    )
}

