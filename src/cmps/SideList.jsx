import {useNavigate } from "react-router-dom"

export function SideList({ stations }) {
    const navigate = useNavigate()

    function handleClick(id, type) {
       navigate(`/${type}/${id}`)
    }

    if (!stations) return null
    return (
        <ul className='side-list-container clean-list'>{
            stations.map(station => (
                <article className="side-card" key={station.id} onClick={() => handleClick(station.id, station.type)}>
                    <div className="img-container square-ratio">
                        <img src={station.imgs[2].url} />
                    </div>
                    <span className='card-title'>{station.name}</span>
                </article>
            ))
        }
        </ul>
    )
}

