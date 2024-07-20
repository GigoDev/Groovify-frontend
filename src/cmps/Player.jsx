import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlaying } from '../store/actions/player.action'
import { formatTime } from '../services/util.service'
import { youtubeService } from '../services/youtube.service'


export function Player() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
    const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    const [volume, setVolume] = useState(0.5)
    const [volumeSnapshot, setVolumeSnapshot] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)

    const [loop, setLoop] = useState(false)
    const [shuffle, setShuffle] = useState(false)

    // Time states
    const [progress, setProgress] = useState(0)
    const [currSongTime, setCurrSongTime] = useState(0)
    const [totalSongTime, setTotalSongTime] = useState(0)
    const [currSongRemainder, setCurrSongRemainder] = useState(0)
    const [showRemainder, setShowRemainder] = useState(false)
    const [prevSongIdx, setPrevSongIdx] = useState(null)
    
    // console.log('stations', stations)
    const dispatch = useDispatch()
   
    const playerRef = useRef(null)
    let shuffleSongs = []
    // console.log('playerRef',playerRef)
    useEffect(() => {
        setCurrSongRemainder(totalSongTime - currSongTime) // updates the remaining time whenever the progress or total time changes
    }, [currSongTime, totalSongTime])
    
    

    function onPlay() {
        // if (!currSong) return
        // console.log('Current playing state:', isPlaying)
        dispatch(togglePlaying(isPlaying))
    }

    function handleProgress(state) {
        if (!state.loaded) return
        setProgress(state.playedSeconds)

        const totalDuration = playerRef.current ? playerRef.current.getDuration() : 0
        setCurrSongTime(state.playedSeconds)
        setTotalSongTime(totalDuration)
    }

    function handleSeek(ev) {
        const seekProgress = ev.target.value
        setProgress(seekProgress)
        playerRef.current.seekTo(seekProgress)
    }

    function handleEnd() {
        if (loop) {
            setProgress(0)
            playerRef.current.SeekTo(0)
            if (isPlaying) {
                playerRef.current.play()
            }
        } else {
            goToNextSong()
        }
    }

    function onNext() {

    }

    function onPrev() {

    }

    function handleMute() {
        if (isMuted || volume === 0) {
            setVolume(volumeSnapshot)
        } else {
            setVolumeSnapshot(volume)
            setVolume(0)
        }
        setIsMuted(!isMuted)
    }

    function handleVolumeChange(ev) {
        if (isMuted) setIsMuted(!isMuted)
        const newVolume = parseFloat(ev.target.value)
        setVolume(newVolume)
        setVolumeSnapshot(volume)
    }


    const videoId = 'tvTRZJ-4EyI'
    return (
        <section className="player-container">

            <div className="left-controls">
                <img className="media-img fit-img" src="http://res.cloudinary.com/dmbgmvobl/image/upload/v1721056820/dkdgpdfddmrsvnyfrjdn.png" alt="img" />
                <div className="artist-details">
                    <span className="player-song-name">Songname</span>
                </div>
                <button>
                    <svg data-encore-id="icon" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path></svg>
                </button>
            </div>

            <div className="center-controls">
                <div className="top-center-controls">
                    <button className={'shuffle-btn' + (shuffle ? ' active' : '')} onClick={() => {
                         setShuffle(!shuffle)
                    }}>
                        <svg data-encore-id="icon" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path><path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path></svg>
                    </button>
                    <button className="prev-btn" onClick={onPrev}>
                        <svg role="img" fill="#b3b3b3" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 uPxdw"><path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path></svg>
                    </button>
                    <button className="play-btn" onClick={onPlay} >
                        {isPlaying ? (<svg width="17" height="17" viewBox="0 0 17 16">
                            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                                fill='black'
                                stroke='black'
                                strokeWidth={0.4}
                            >
                            </path>
                        </svg>) : (<svg width="17" height="17" viewBox="0 0 16 16" >
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                                fill='black'
                                stroke='black'
                                strokeWidth={1}
                            >
                            </path>
                        </svg>)
                        }
                    </button>
                    <button className="next-btn " onClick={onNext}>
                        <svg role="img" fill="#b3b3b3" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 uPxdw"><path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path></svg>
                    </button>
                    <button className={'loop-btn' + (loop ? ' active' : '')} onClick={() => {
                        setLoop(!loop)
                    }}>
                        <svg role="img" fill="#b3b3b3" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 uPxdw"><path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path></svg>
                    </button>
                </div>

                <div className="bottom-center-controls">
                    <span className="time-progress-1">{formatTime(currSongTime)}</span>
                    <div className="progress-bar" style={{ width: `${progress / totalSongTime * 100}%` }}></div>
                    <div className="progress-container" >
                        <input
                            className="prog progress-bar timestamp"
                            type="range"
                            id='progressRange'
                            name='progressRange'
                            min="0"
                            step={0.1}
                            value={progress}
                            onChange={handleSeek}
                            max={playerRef.current ? playerRef.current.getDuration() : 0} />
                    </div>
                    <span className="time-progress-2" onClick={() => {
                        setShowRemainder(!showRemainder)
                        setCurrSongRemainder(totalSongTime - currSongTime)
                    }}>
                        {isPlaying ? showRemainder ? '-' + formatTime(currSongRemainder) : formatTime(totalSongTime) : '-:--'}
                    </span>
                </div>
            </div>

            <div className="right-controls">
                <button className="lyrics-btn">
                    <svg role="img" fill="#b3b3b3" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M13.426 2.574a2.831 2.831 0 00-4.797 1.55l3.247 3.247a2.831 2.831 0 001.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 004.74 9.075L2.065 12.12a1.287 1.287 0 001.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 114.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 01-3.933-3.933l2.676-3.045 3.505-3.99z"></path></svg>
                </button>
                <button className="player-viewer-btn">
                    <svg data-encore-id="icon" fill="#b3b3b3" height="16" width="16" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M11.196 8 6 5v6l5.196-3z"></path><path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"></path></svg>
                </button>
                <button className="queue-btn">
                    <svg data-encore-id="icon" fill="#b3b3b3" height="16" width="16" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path></svg>
                </button>
                <button className="device-connector">
                    <svg data-encore-id="icon" role="img" height="16" fill="#b3b3b3" width="16" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"></path><path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
                </button>
                <button className="sound-btn" onClick={handleMute}>
                    {isMuted || volume === 0 ? (
                            <svg width="16" height="16" viewBox="0 0 17 16" >
                                <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"
                                    fill="black"
                                    stroke="black"

                                >
                                </path>
                                <svg width="16" height="16" viewBox="0 0 17 16" >
                                    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"
                                        fill="#b3b3b3"
                                        stroke="#b3b3b3"
                                        strokeWidth={0.1}
                                    >
                                    </path>
                                    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"
                                        fill="#b3b3b3"
                                        stroke="#b3b3b3"
                                        strokeWidth={0.1}
                                    >
                                    </path>
                                </svg>
                            </svg>
                        ) : volume < 0.33 ? (
                            <svg width="16" height="16" viewBox="0 0 17 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                    strokeWidth={0.1}
                                >
                                </path>
                            </svg>
                        ) : volume < 0.65 ? (
                            <svg width="16" height="16" viewBox="0 0 17 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                    strokeWidth={0.1}
                                >
                                </path>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 17 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                    strokeWidth={0.1}
                                >
                                </path>
                                <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                    strokeWidth={0.1}
                                >
                                </path>
                            </svg>
                        )}
                </button>
                <div className="progress-container">
                    <progress hidden className="prog progress-bar" max="100"></progress>
                    <input className="prog input-bar sound" type="range" max="100" />
                </div>
                <button className="miniplayer-btn">
                    <svg data-encore-id="icon" height="16" fill="#b3b3b3" width="16" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16V2.45z"></path><path d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75h5.925z"></path></svg>
                </button>
                <button className="fullscreen-btn">
                    <svg role="img" height="16" fill="#b3b3b3" width="16" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 uPxdw"><path d="M6.53 9.47a.75.75 0 010 1.06l-2.72 2.72h1.018a.75.75 0 010 1.5H1.25v-3.579a.75.75 0 011.5 0v1.018l2.72-2.72a.75.75 0 011.06 0zm2.94-2.94a.75.75 0 010-1.06l2.72-2.72h-1.018a.75.75 0 110-1.5h3.578v3.579a.75.75 0 01-1.5 0V3.81l-2.72 2.72a.75.75 0 01-1.06 0z"></path></svg>
                </button>
            </div>

            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                playing={isPlaying}
                muted={isMuted}
                onProgress={handleProgress}
                onEnded={handleEnd}
                height="0"
                width="0"
            />
            {/* <iframe width="0" height="0" src={`https://www.youtube.com/embed/${videoId}`}></iframe> */}

        </section>
    )
}