import MusicNoteIcon from '../assets/icons/MusicNoteIcon.svg'
import PlayIcon from '../assets/icons/PlayIcon.svg'
import PauseIcon from '../assets/icons/PauseIcon.svg'
import { useSelector } from 'react-redux'

export function MiniStationPreview({ station, onPlay }) {
    const { imgs, id, listeners, name, type, tracks } = station
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const currPlayingStation = useSelector(storeState => storeState.stationModule.currPlayingStation)
    function onPreviewPlay() {
        
    }

    return (
        <article className="mini-card">
            <div className="mini-card-img-container">
                {imgs[(imgs.length - 1)].url ?
                    <img className="mini-card-img"
                        src={imgs[(imgs.length - 1)].url} />
                    :
                    <MusicNoteIcon className="music-note-icon" width="24" height="24" />
                }
            </div>
            <span className='mini-card-title'>{name}</span>
            <button className="btn-play-green" onClick={(ev) => onPlay(ev, tracks[0], tracks)}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
        </article >
    )
}