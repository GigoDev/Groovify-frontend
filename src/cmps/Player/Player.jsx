// React:
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useSelector } from 'react-redux'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'


import { playNextPrev, togglePlay } from '../..//store/actions/station.actions'
import { formatTime } from '../../services/util.service'

// Player controls:
import { PlayerLeft } from './PlayerLeft'
// import { PlayerCenter } from './PlayerCenter'

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


export function Player() {
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)


    const [volume, setVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)

    const [isLoop, setLoop] = useState(false)
    const [isShuffle, setShuffle] = useState(false)

    // Time states
    const [progress, setProgress] = useState(0)
    const [currSongTime, setCurrSongTime] = useState(0)
    const [totalSongTime, setTotalSongTime] = useState(0)

    const playerRef = useRef(null)

    function handleProgress(state) {
        if (!state.loaded) return
        setProgress(state.playedSeconds)

        const totalDuration = playerRef.current ? playerRef.current.getDuration() : 0
        setCurrSongTime(state.playedSeconds)
        setTotalSongTime(totalDuration)
    }

    function handleSeek(ev) {
        const seekProgress = ev.target.value
        console.log(seekProgress)
        setProgress(seekProgress)
        playerRef.current.seekTo(seekProgress)
    }

    function handleMute() {
        setIsMuted(!isMuted)
    }

    function getDuration(duration) {
        return duration
    }

    function handleVolumeChange(ev) {
        const newVolume = parseFloat(ev.target.value)
        if (!newVolume && isMuted) setIsMuted(false)

        setVolume(newVolume)
    }

    const { album, name } = currTrack
    return (

        <section className="player-container">

            <ReactPlayer
                className='react-player'
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currTrack?.youtubeId}`}
                playing={isPlaying}
                loop={isLoop}
                volume={volume}
                muted={isMuted}
                onProgress={handleProgress}
                onEnded={() => playNextPrev(1)}
                onDuration={getDuration}
                height="0"
                width="0"
            />

            <PlayerLeft
                album={album}
                name={name} />

            <div className="center-controls">

                <div className="top-center-controls">
                    <button className={'shuffle-btn' + (isShuffle ? ' active' : '')} onClick={() => {
                        setShuffle(!isShuffle)
                    }}>
                        <ShuffleIcon />
                    </button>

                    <button className="prev-btn" onClick={() => playNextPrev(-1)}>
                        <PrevSongIcon />
                    </button>

                    <button className="play-btn" onClick={togglePlay} >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className="next-btn " onClick={() => playNextPrev(1)}>
                        <NextSong />
                    </button>
                    <button className={'loop-btn' + (isLoop ? ' active' : '')} onClick={() => {
                        setLoop(!isLoop)
                    }}>
                        <LoopIcon />
                    </button>
                </div>

                <div className="bottom-center-controls">
                    <span className="time-progress">{formatTime(currSongTime)}</span>

                    <input
                        className="progress-bar"
                        type="range"
                        min="0"
                        step={1}
                        value={progress}
                        onChange={handleSeek}
                        max={totalSongTime}
                        style={{ background: `linear-gradient(to right, white ${progress / totalSongTime * 100}%,  rgba(255, 255, 255, 0.3) ${progress / totalSongTime * 100}%)` }}
                    />

                    <span className="time-progress"> {formatTime(totalSongTime)} </span>
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
                <input onChange={handleVolumeChange}
                    className="sound"
                    type="range"
                    step="0.01"
                    max="1"
                    style={{ background: `linear-gradient(to right, white ${volume * 100}%,  rgba(255, 255, 255, 0.3) ${volume * 100}%)` }}
                />
                <button className="miniplayer-btn">
                    <MiniPlayerIcon />
                </button>
                <button className="fullscreen-btn">
                    <FullScreenIcon />
                </button>
            </div>


        </section>
    )
}