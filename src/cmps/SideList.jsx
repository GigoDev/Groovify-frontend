import { Link } from "react-router-dom"

export function SideList({ stations }) {


    if (!stations) return null
    //img, name, creator, 
    return (
        <ul className='side-list-container clean-list'>{
            stations.map(station => (
                <Link to={`station/${station.id}`} key={station.id}>
                    <article className="side-card">
                        <div className="img-container square-ratio">
                            <img src={station.imgs[2].url} />
                        </div>
                        <span className='card-title'>{station.name}</span>
                    </article>
                </Link>
            ))
        }
        </ul>
    )
}

