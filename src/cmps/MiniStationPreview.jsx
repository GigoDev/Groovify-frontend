import MusicNoteIcon from '../assets/icons/MusicNoteIcon.svg'
import PlayIcon from '../assets/icons/PlayIcon.svg'
import PauseIcon from '../assets/icons/PauseIcon.svg'
import { useSelector } from 'react-redux'
import { setPlayingStation, setTrack, togglePlay } from '../store/actions/station.actions'

export function MiniStationPreview({ station }) {
    const { imgs, id, listeners, name, type, tracks } = station
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currPlayingStation = useSelector(storeState => storeState.stationModule.currPlayingStation)
    
    function onPreviewPlay(event, station) {
        event.stopPropagation()
        event.preventDefault()
        if (currPlayingStation._id === station._id) return togglePlay()
        setTrack(station.tracks[0])
        setPlayingStation(station)
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
            <button className="btn-play-green" onClick={(ev) => onPreviewPlay(ev, station)}>
                {isPlaying && currPlayingStation._id === station._id ? <PauseIcon /> : <PlayIcon />}
            </button>
        </article >
    )
}