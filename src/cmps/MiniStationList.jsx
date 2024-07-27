import { MiniStationPreview } from "./MiniStationPreview"
import { Link } from 'react-router-dom';


export function MiniStationList({ stations, extractColor }) {

    if (!stations) return <div>Loading..</div>
    return (
        <ul className='mini-cards-container clean-list'>{

            stations.map(station => (
                <Link to={`${station.type}/${station._id}`}
                    onMouseEnter={() => extractColor(station.imgs[0].url)}
                    key={station._id}>
                    <MiniStationPreview station={station} />
                </Link>
            ))
        }
        </ul>
    )
}

