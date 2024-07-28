import { formatDate } from "../services/util.service"
import SmallBtnOptions from '../assets/icons/SmallBtnOptions.svg'
import LikeIcon from '../assets/icons/LikeIcon.svg'
import RemoveBinIcon from '../assets/icons/RemoveBinIcon.svg'
import { StationMenuModal } from "./StationMenuModal"

import PlayIcon from '../assets/icons/PlayIcon.svg';
import PauseIcon from '../assets/icons/PauseIcon.svg';
import Equalizer from '../assets/gifs/Equalizer.gif';
import { useSelector } from "react-redux"


export function PlaylistList({ station, onUpdateStation, onPlay }) {
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const { tracks } = station
    // console.log('tracks', tracks)
    function handleDelete(trackId) {
        console.log('trackId', trackId)
        const newTracks = tracks.filter(track => track.spotifyId !== trackId)
        const stationToUpdate = { ...station, tracks: newTracks }
        onUpdateStation(stationToUpdate)
        console.log('Deleted track id:', trackId)
    }

    function getMenuOptions(trackId) {
        return [
            {
                label: (
                    <>
                        <RemoveBinIcon width="18" height="18" fill="#a7a7a7" role="img" aria-hidden="true" />
                        Remove from this playlist
                    </>
                ),
                onClick: () => handleDelete(trackId)
            }
        ]
    }
    return (
        <ul className='playlist-list clean-list'>{tracks.map((track, idx) => (
            <li key={track.spotifyId + idx}>
                <span className='play-icon' onClick={(event) => onPlay(event, track)}>
                    {isPlaying && currTrack.spotifyId === track.spotifyId ?
                        <PauseIcon /> : <PlayIcon />}
                </span>
                <span className={`playlist-number ${isPlaying && currTrack.spotifyId === track.spotifyId ? 'active' : ''}`}>
                    {isPlaying && currTrack.spotifyId === track.spotifyId ? (
                        <img src={Equalizer} alt="Equalizer" className='equalizer equalizer-gif' />
                    ) : (
                        idx + 1
                    )}
                </span>
                <img src={track.album.imgs[(track.album.imgs.length - 1)].url} />

                <div className='name'>
                    <div className={`title ${isPlaying && currTrack.spotifyId === track.spotifyId ? 'active' : ''}`}>{track.name}</div>
                    <div className="artist">{track.artist.name}</div>
                </div>

                <span className='album'>{track.album.name}</span>
                <span className='date'>{track.addedAt ? formatDate(track.addedAt) : ''}</span>

                <button className="btn-like">
                    <LikeIcon className="like-icon" />
                </button>

                <span className='createdAt'>{track.duration}</span>

                <StationMenuModal
                    trigger={
                        <button className="btn-more">
                            <SmallBtnOptions className="small-btn-options" />
                        </button>
                    }
                    options={getMenuOptions(track.spotifyId)}
                />
            </li>
        ))}
        </ul>

    )
}
