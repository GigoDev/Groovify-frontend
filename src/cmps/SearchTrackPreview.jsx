
import PlayIcon from '../assets/icons/PlayIcon.svg'
import PauseIcon from '../assets/icons/PauseIcon.svg'


export function SearchTrackPreview({ track, addTrack, onPlay, currTrack, isPlaying }) {
    
    return (
        <article className="station-search-preview">
            <div className="song-img-container">
                <div className="song-img">
                    <img src={track.album.imgs[2].url} alt="" />
                </div >
                <div onClick={(ev) => onPlay(ev, track)}
                    className="btn-play-pause">
                    {currTrack.spotifyId === track.spotifyId ? isPlaying ? (<PauseIcon className="play-icon" fill="white" stroke="white" />) : ((<PlayIcon className="play-icon" fill="white" stroke="white" />)) :
                        (<PlayIcon className="play-icon" fill="white" stroke="white" />)}

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