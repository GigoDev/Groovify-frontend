import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'

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
                          <MusicNoteIcon/>
                         }
                    </div>
                    <span className='card-title'>{station.name}</span>
                </article>
            ))
        }
        </ul>
    )
}

