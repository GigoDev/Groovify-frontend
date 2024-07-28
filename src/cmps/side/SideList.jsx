import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'
import { Link } from 'react-router-dom';
import SpotifyLoader from '../../assets/gifs/SpotifyLoader.gif'



export function SideList({ stations, filterBy, isCollapsed}) {
    const { id } = useParams()
    const [activeId, setActiveId] = useState(id)

    useEffect(() => {
    }, [id])
    if (!stations) return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>

    return (
        <ul className='side-list-container clean-list'>{

            stations
                .filter(station => station.type === filterBy.type && station.owner === true)
                .map(station => (

                    <Link to={`/${station.type}/${station._id}`} key={station._id}>

                        <article
                            className={!isCollapsed && activeId === station._id ? 'side-card active' : 'side-card'}
                            key={station._id}
                            onClick={() => setActiveId(station._id)}
                        >
                            <div className="img-container">
                                {station.imgs[(station.imgs.length - 1)].url ?
                                    <img src={station.imgs[(station.imgs.length - 1)].url} />
                                    :
                                    <MusicNoteIcon className="music-note-icon" fill="#a7a7a7" width="23" height="23" />
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

