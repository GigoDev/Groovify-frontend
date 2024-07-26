import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'


export function SideList({ filtered }) {
    const navigate = useNavigate()
    const [activeId, setActiveId] = useState(null)


    function handleClick(id, type) {
        setActiveId(id)
        navigate(`/${type}/${id}`)
    }
    
    if (!filtered) return null
    // console.log('filtered', filtered)
    return (
        <ul className='side-list-container clean-list'>{
            filtered.map(station => (
                <article
                    className={activeId === station._id ? 'side-card active' : 'side-card'}
                    key={station._id}
                    onClick={() => handleClick(station._id, station.type)}>
                    <div className="img-container">
                        {station.imgs[(station.imgs.length - 1)].url ?
                            <img src={station.imgs[(station.imgs.length - 1)].url} />
                            :
                            <MusicNoteIcon />
                        }
                    </div>
                    <div className="card-details">
                        <span className='card-title'>{station.name}</span>
                        <span className="card-type">{station.type}</span>
                    </div>
                </article>
            ))
        }
        </ul>
    )
}

