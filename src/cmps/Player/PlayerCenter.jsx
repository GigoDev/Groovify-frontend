import { formatTime } from '../../services/util.service'


// SVGs:
import ShuffleIcon from '../../assets/icons/ShuffleIcon.svg'
import PrevSongIcon from '../../assets/icons/PrevSongIcon.svg'
import PlayIcon from '../../assets/icons/PlayIcon.svg'
import PauseIcon from '../../assets/icons/PauseIcon.svg'
import NextSong from '../../assets/icons/NextSong.svg'
import LoopIcon from '../../assets/icons/LoopIcon.svg'


export function PlayerCenter({ setShuffle, setLoop, setShowRemainder, playerRef }) {
    return (
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
    )
}