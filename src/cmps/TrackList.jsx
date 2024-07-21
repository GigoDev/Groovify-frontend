import { useState } from "react"
import { Link } from "react-router-dom"

import PauseIcon from "../assets/icons/PauseIcon.svg"

export function TrackList({ tracks, onAddTrack }) {
    const initialTrackLength = tracks.length >= 5 ? 5 : tracks.length
    const [visibleTracks, setVisibleTracks] = useState(initialTrackLength)
    const [numContent, setNumContent] = useState(null)

    function handleMoreLessClick() {
        if (tracks.length < 5) return
        else if (visibleTracks === 5) setVisibleTracks(tracks.length)
        else if (visibleTracks > 5) setVisibleTracks(5)
    }

    function onAddTrack(track) {
        console.log('TODO: add track to liked songs', track)
    }

    function onPlay(track) {
        console.log('TODO: play track:', track)
    }


    if (!tracks) return <div>Loading...</div>
    return (
        <ul className='track-list clean-list'> {//track list rendering
            tracks.slice(0, visibleTracks).map((track, idx) => (
                <li key={track.id}>
                    <span className='play-icon' onClick={() => onPlay(track)}>
                        <svg width="17" height="17" viewBox="0 0 16 16" >
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                                fill='white'
                                stroke='white'
                                strokeWidth={1}>
                            </path>
                        </svg>
                    </span>
                    <span className='track-number'>{idx + 1}</span>
                    <img src={track.album.images[2].url} />
                    <Link className='title'>{track.name}</Link>
                    <span className='listeners'>100,000,000</span>
                    <span className='add-btn' onClick={() => onAddTrack(track)}> <svg data-encore-id="icon" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path></svg></span>
                    <span className='time'>Time</span>
                </li>
            ))
        }

            <button className="btn show-more" onClick={handleMoreLessClick}>
                {visibleTracks > 5 ? 'Show less' : 'See more'}
            </button>
        </ul>

    )
}
