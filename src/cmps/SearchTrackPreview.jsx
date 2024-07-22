
import PlayIcon from '../assets/icons/PlayIcon.svg'

export function SearchTrackPreview() {
    return (
        <li className="station-search-preview">
            <div className="song-img-container">
                <div className="song-img">
                    <img src="http://res.cloudinary.com/dmbgmvobl/image/upload/v1721056820/dkdgpdfddmrsvnyfrjdn.png" alt="" />
                </div>
                <div className="btn-play-pause">
                    <PlayIcon />
                </div>
            </div>
            <div className="song-title">
                <span className="artist-name">John Doe</span>
            </div>
            <button className="btn-add-song">Add</button>
        </li>
    )
}