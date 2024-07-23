import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SideList({ stations }) {
    const navigate = useNavigate()
    const [activeId, setActiveId] = useState(null)

    function handleClick(id, type) {
        setActiveId(id)
        navigate(`/${type}/${id}`)
    }

    if (!stations) return null
    return (
        <ul className='side-list-container clean-list'>{
            stations.map(station => (
                <article
                    className={activeId === station.id ? 'side-card active' : 'side-card'}
                    key={station.id}
                    onClick={() => handleClick(station.id, station.type)}>
                    <div className="img-container square-ratio">
                        {station.imgs[(station.imgs.length - 1)].url ?
                         <img src={station.imgs[(station.imgs.length - 1)].url} />
                          :
                                    <svg data-encore-id="icon" role="img" aria-hidden="true" fill="grey" viewBox="0 0 24 24" className="tone-icon"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                         }
                    </div>
                    <span className='card-title'>{station.name}</span>
                </article>
            ))
        }
        </ul>
    )
}

