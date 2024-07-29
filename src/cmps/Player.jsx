// React:
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useSelector } from 'react-redux'

import { next, prev, shuffle, togglePlay } from '../store/actions/station.actions'
import { formatTime, truncateText } from '../services/util.service'


// SVGs:
import ShuffleIcon from '../assets/icons/ShuffleIcon.svg'
import PrevSongIcon from '../assets/icons/PrevSongIcon.svg'
import PlayIcon from '../assets/icons/PlayIcon.svg'
import PauseIcon from '../assets/icons/PauseIcon.svg'
import NextSong from '../assets/icons/NextSong.svg'
import LoopIcon from '../assets/icons/LoopIcon.svg'

import VolumeMutedIcon from '../assets/icons/VolumeMutedIcon.svg'
import VolumeNormalIcon from '../assets/icons/VolumeNormalIcon.svg'
import Volume033Icon from '../assets/icons/Volume033Icon.svg'
import Volume066Icon from '../assets/icons/Volume066Icon.svg'
import LikeIcon from '../assets/icons/LikeIcon.svg'


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

    // Hover state
    const [isHoverProgressBar, setIsHoverProgressBar] = useState(false)
    const [isHoverVolumeSlider, setIsHoverVolumeSlider] = useState(false)
    
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
    const {artist, album, name } = currTrack
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
                onEnded={() => isShuffle ? shuffle() : next()}
                onDuration={getDuration}
                height="0"
                width="0"
            />

            <div className="left-controls">
                <img className="media-img fit-img" src={`${album.imgs[2].url}`} />
                 <div className="artist-details">
                    <span className="player-song-name">{truncateText(name, 5) }</span>
                    <span className="player-song-artist">{artist.name}</span>
                </div>
                <button className="like-btn">
                    <LikeIcon width="18" height="18"/>
                </button>
            </div>


            <div className="center-controls">

                <div className="top-center-controls">
                    <button className={'shuffle-btn' + (isShuffle ? ' active' : '')} onClick={() => {
                        setShuffle(prevIsShuffle => !prevIsShuffle)
                    }}>
                        <ShuffleIcon />
                    </button>

                    <button className="prev-btn" onClick={prev}>
                        <PrevSongIcon />
                    </button>

                    <button className="play-btn" onClick={togglePlay} >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className="next-btn " onClick={() => isShuffle ? shuffle() : next()}>
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
                        onMouseEnter={() => setIsHoverProgressBar(true)}
                        onMouseLeave={() => setIsHoverProgressBar(false)}
                        style={{ background: `linear-gradient(to right, ${isHoverProgressBar ? '#1ED760' : 'white'} ${progress / totalSongTime * 100}%,  rgba(255, 255, 255, 0.3) ${progress / totalSongTime * 100}%)` }}
                    />

                    <span className="time-progress"> {formatTime(totalSongTime)} </span>
                </div>
            </div>

            <div className="right-controls">

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
                    onMouseEnter={() => setIsHoverVolumeSlider(true)}
                    onMouseLeave={() => setIsHoverVolumeSlider(false)}
                    style={{ background: `linear-gradient(to right, ${isHoverVolumeSlider ? '#1ED760' : 'white'} ${volume * 100}%,  rgba(255, 255, 255, 0.3) ${volume * 100}%)` }}
                />

            </div>


        </section>
    )
}