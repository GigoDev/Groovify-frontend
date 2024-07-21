// React:

import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useDispatch, useSelector } from 'react-redux'


import { togglePlaying } from '../../store/actions/player.action'
import { formatTime } from '../../services/util.service'

// Player controls:
import { PlayerLeft } from './PlayerLeft'

// SVGs:
import ShuffleIcon from '../../assets/icons/ShuffleIcon.svg'
import PrevSongIcon from '../../assets/icons/PrevSongIcon.svg'
import PlayIcon from '../../assets/icons/PlayIcon.svg'
import PauseIcon from '../../assets/icons/PauseIcon.svg'
import NextSong from '../../assets/icons/NextSong.svg'
import LoopIcon from '../../assets/icons/LoopIcon.svg'
import LyricsIcon from '../../assets/icons/LyricsIcon.svg'
import PlayerViewerIcon from '../../assets/icons/PlayerViewerIcon.svg'
import QueueIcon from '../../assets/icons/QueueIcon.svg'
import DeviceConnectorIcon from '../../assets/icons/DeviceConnectorIcon.svg'
import VolumeMutedIcon from '../../assets/icons/VolumeMutedIcon.svg'
import VolumeNormalIcon from '../../assets/icons/VolumeNormalIcon.svg'
import Volume033Icon from '../../assets/icons/Volume033Icon.svg'
import Volume066Icon from '../../assets/icons/Volume066Icon.svg'
import MiniPlayerIcon from '../../assets/icons/MiniPlayerIcon.svg'
import FullScreenIcon from '../../assets/icons/FullScreenIcon.svg'
import { PlayerRight } from './PlayerRight'


export function Player() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currTrackId = useSelector(storeState => storeState.playerModule.currTrackId)
    const currTrack = useSelector(storeState => storeState.playerModule.currTrack)
    
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

    const dispatch = useDispatch()

    const playerRef = useRef(null)
    let shuffleSongs = []
    useEffect(() => {
        setCurrSongRemainder(totalSongTime - currSongTime) // updates the remaining time whenever the progress or total time changes
    }, [currSongTime, totalSongTime])



    function onPlay() {
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
            onNext()
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


    const trackId = 'tvTRZJ-4EyI'
    return (
        <section className="player-container">

            <PlayerLeft />

            <div className="center-controls">

                <div className="top-center-controls">
                    <button className={'shuffle-btn' + (shuffle ? ' active' : '')} onClick={() => {
                        setShuffle(!shuffle)
                    }}>
                        <ShuffleIcon />
                    </button>

                    <button className="prev-btn" onClick={onPrev}>
                        <PrevSongIcon />
                    </button>

                    <button className="play-btn" onClick={onPlay} >
                        {isPlaying ? (<PlayIcon />) : (<PauseIcon />)
                        }
                    </button>
                    <button className="next-btn " onClick={onNext}>
                        <NextSong />
                    </button>
                    <button className={'loop-btn' + (loop ? ' active' : '')} onClick={() => {
                        setLoop(!loop)
                    }}>
                        <LoopIcon />
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
                    <LyricsIcon />
                </button>
                <button className="player-viewer-btn">
                    <PlayerViewerIcon />
                </button>
                <button className="queue-btn">
                    <QueueIcon />
                </button>
                <button className="device-connector">
                    <DeviceConnectorIcon />
                </button>
                <button className="sound-btn" onClick={handleMute}>
                    {isMuted || volume === 0 ? (
                        <VolumeMutedIcon />
                    ) : volume < 0.33 ? (
                        <Volume033Icon />
                    ) : volume < 0.65 ? (
                        <Volume066Icon />
                    ) : (
                        <VolumeNormalIcon />
                    )}
                </button>
                <div className="progress-container">
                    <progress hidden className="prog progress-bar" max="100"></progress>
                    <input className="prog input-bar sound" type="range" max="100" />
                </div>
                <button className="miniplayer-btn">
                    <MiniPlayerIcon />
                </button>
                <button className="fullscreen-btn">
                    <FullScreenIcon />
                </button>
            </div>

            <ReactPlayer
                className='react-player'
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currTrack?.youtubeId}`}
                playing={isPlaying}
                muted={isMuted}
                onProgress={handleProgress}
                onEnded={handleEnd}
                height="0"
                width="0"
            />
        </section>
    )
}