
import PlayIcon from '../assets/icons/PlayIcon.svg'

export function SearchTrackPreview({ track, addTrack }) {
    return (
        <article className="station-search-preview">
            <div className="song-img-container">
                <div className="song-img">
                    <img src={track.album.imgs[2].url} alt="" />
                </div>
                <div className="btn-play-pause">
                    <PlayIcon className="play-icon" fill="white" stroke="white" />
                </div>
            </div>
            <div className="song-title">
                <span className="artist-name">{track.name}</span>
            </div>

            <button
                onClick={() => addTrack(track)}
                className="btn-add-song">Add</button>
        </article>
    )
}