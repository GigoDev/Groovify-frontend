import { useState } from "react"
import { Link } from "react-router-dom"
import PlayIcon from '.././assets/icons/PlayIcon.svg'
import PauseIcon from '.././assets/icons/PauseIcon.svg'
import { useSelector } from 'react-redux'
import { getRandomIntInclusive } from "../services/util.service"


export function TrackList({ tracks, onAddTrack, onPlay ,onRemoveTrack}) {
    const initialTrackLength = tracks.length >= 5 ? 5 : tracks.length
    const [visibleTracks, setVisibleTracks] = useState(initialTrackLength)
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)


    function handleMoreLessClick() {
        if (tracks.length < 5) return
        else if (visibleTracks === 5) setVisibleTracks(tracks.length)
        else if (visibleTracks > 5) setVisibleTracks(5)
    }

    if (!tracks) return <div>Loading...</div>
    return (
        <ul className='track-list clean-list'> {//track list rendering
            tracks.slice(0, visibleTracks).map((track, idx) => (
                <li key={track.spotifyId}>
                    <span className='play-btn' onClick={(event) => onPlay(event, track)}>
                        {isPlaying && currTrack.spotifyId === track.spotifyId ? <PauseIcon /> : <PlayIcon />}
                    </span>
                    <span className='track-number'>{idx + 1}</span>
                    <img src={track.album.imgs.at(-1).url} />
                    <Link className='title'>{track.name}</Link>
                    <span className='listeners' onClick={() => onRemoveTrack(track)}>1,000,000</span>
                    <span className='add-btn' onClick={() => onAddTrack(track)}> <svg data-encore-id="icon" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path></svg></span>
                    <span className='time'>{track.duration}</span>
                </li>
            ))
        }

            <button className="btn show-more" onClick={handleMoreLessClick}>
                {visibleTracks > 5 ? 'Show less' : 'See more'}
            </button>
        </ul>

    )
}
