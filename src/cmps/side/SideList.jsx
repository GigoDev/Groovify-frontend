import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'
import { Link } from 'react-router-dom';


export function SideList({ stations, filterBy }) {
    const { id } = useParams()
    const [activeId, setActiveId] = useState(id)

    useEffect(()=>{
    },[id])

    if (!stations) return null
    // console.log('filtered', filtered)
    return (
        <ul className='side-list-container clean-list'>{

            stations
                .filter(station => station.type === filterBy.type && station.owner === true)
                .map(station => (

                    <Link to={`/${station.type}/${station._id}`} key={station._id}>

                        <article
                            className={activeId === station._id ? 'side-card active' : 'side-card'}
                            key={station._id}
                            onClick={() => setActiveId(station._id)}
                        >
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

                    </Link>

                ))
        }
        </ul>
    )
}

