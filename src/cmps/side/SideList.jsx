import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'
import { Link } from 'react-router-dom';
import SpotifyLoader from '../../assets/gifs/SpotifyLoader.gif'
import { userService } from '../../services/user'


export function SideList({ stations, filterBy, isCollapsed, activeId, setActiveId }) {

    function filterStations() {
        const loggedInUser = userService.getLoggedinUser()
        // Filter stations based on whether they are followed by the logged-in user
        let stationsToReturn = stations?.filter(station => station.followBy?.some(user => user?._id === loggedInUser._id) || station.owner?._id === loggedInUser._id)

        // Filter by type if specified
        if (filterBy.type) stationsToReturn = stationsToReturn.filter(station => station.type === filterBy.type)

        // Filter by text if specified
        if (filterBy.txt !== '') {
            const regex = new RegExp(filterBy.txt, 'i')
            stationsToReturn = stationsToReturn.filter(station => regex.test(station.name) || regex.test(station.description))
        }

        return stationsToReturn
    }

    if (!stations) return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
    const userStations = filterStations()
    return (
        <ul className='side-list-container clean-list'>{
            userStations.map(station => (
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
