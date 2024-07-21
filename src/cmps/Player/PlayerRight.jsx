// import ReactPlayer from "react-player";
// import LyricsIcon from '../../assets/icons/LyricsIcon.svg'
// import PlayerViewerIcon from '../../assets/icons/PlayerViewerIcon.svg'
// import QueueIcon from '../../assets/icons/QueueIcon.svg'
// import DeviceConnectorIcon from '../../assets/icons/DeviceConnectorIcon.svg'
// import VolumeMutedIcon from '../../assets/icons/VolumeMutedIcon.svg'
// import VolumeNormalIcon from '../../assets/icons/VolumeNormalIcon.svg'
// import Volume033Icon from '../../assets/icons/Volume033Icon.svg'
// import Volume066Icon from '../../assets/icons/Volume066Icon.svg'
// import MiniPlayerIcon from '../../assets/icons/MiniPlayerIcon.svg'
// import FullScreenIcon from '../../assets/icons/FullScreenIcon.svg'

export function PlayerRight({isMuted, volume, handleMute, ref, url, playing, muted, handleProgress, handleEnd }) {
    // return (
    //     <>
    //         <div className="right-controls">
    //             <button className="lyrics-btn">
    //                 <LyricsIcon />
    //             </button>
    //             <button className="player-viewer-btn">
    //                 <PlayerViewerIcon />
    //             </button>
    //             <button className="queue-btn">
    //                 <QueueIcon />
    //             </button>
    //             <button className="device-connector">
    //                 <DeviceConnectorIcon />
    //             </button>
    //             <button className="sound-btn" onClick={handleMute}>
    //                 {isMuted || volume === 0 ? (
    //                     <VolumeMutedIcon />
    //                 ) : volume < 0.33 ? (
    //                     <Volume033Icon />
    //                 ) : volume < 0.65 ? (
    //                     <Volume066Icon />
    //                 ) : (
    //                     <VolumeNormalIcon />
    //                 )}
    //             </button>
    //             <div className="progress-container">
    //                 <progress hidden className="prog progress-bar" max="100"></progress>
    //                 <input className="prog input-bar sound" type="range" max="100" />
    //             </div>
    //             <button className="miniplayer-btn">
    //                 <MiniPlayerIcon />
    //             </button>
    //             <button className="fullscreen-btn">
    //                 <FullScreenIcon />
    //             </button>
    //         </div>

    //         <ReactPlayer
    //             className='react-player'
    //             ref={playerRef}
    //             url={`https://www.youtube.com/watch?v=${videoId}`}
    //             playing={isPlaying}
    //             muted={isMuted}
    //             onProgress={handleProgress}
    //             onEnded={handleEnd}
    //             height="0"
    //             width="0"
    //         />
    //     </>
    // )
}