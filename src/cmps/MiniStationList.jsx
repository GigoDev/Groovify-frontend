import { MiniStationPreview } from "./MiniStationPreview"
import { Link } from 'react-router-dom';


export function MiniStationList({stations}) {

    if (!stations) return <div>Loading..</div>
    return (
            <ul className='mini-cards-container clean-list'>{
                    stations.map(station => (
                        <Link to={`${station.type}/${station._id}`} key={station._id}>
                            <MiniStationPreview station={station}/> 
                        </Link>
                    ))
                }
            </ul>
    )
}

