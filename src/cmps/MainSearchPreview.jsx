
import PlayIcon from '../assets/icons/PlayIcon.svg'

export function MainSearchPreview({ track }) {
    return (
        <li className="station-search-preview">
            <div className="song-img-container">
                <div className="song-img">
                    <img src={track.thumbnail} alt="" />
                </div>
                <div className="btn-play-pause">
                    <PlayIcon />
                </div>
            </div>
            <div className="song-title">
                <span className="artist-name">{track.title}</span>
            </div>
            <button className="btn-add-song">Add</button>
        </li>
    )
}