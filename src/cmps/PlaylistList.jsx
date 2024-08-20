import { formatDate, truncateText } from "../services/util.service"
import SmallBtnOptions from '../assets/icons/SmallBtnOptions.svg'
import LikeIcon from '../assets/icons/LikeIcon.svg'
import RemoveBinIcon from '../assets/icons/RemoveBinIcon.svg'
import { StationMenuModal } from "./StationMenuModal"
import PlayIcon from '../assets/icons/PlayIcon.svg';
import PauseIcon from '../assets/icons/PauseIcon.svg';
import VIcon from '../assets/icons/VIcon.svg';
import AddLibrary from '../assets/icons/AddLibrary.svg';
import Equalizer from '../assets/gifs/Equalizer.gif';
import { useSelector } from "react-redux"
import { useState } from "react"
import { updateLikedStation } from "../store/actions/station.actions";



export function PlaylistList({ station, onUpdateStation, onPlay }) {
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const likedTracksIds = useSelector(storeState => storeState.stationModule.stations?.find((station) => station.name === 'Liked Songs'))?.tracks.map(track => track.spotifyId)

    const [activeId, setActiveId] = useState('')

    const { tracks, owner } = station
    function handleDelete(trackId) {
        // console.log('trackId', trackId)
        const newTracks = tracks.filter(track => track.spotifyId !== trackId)
        const stationToUpdate = { ...station, tracks: newTracks }
        onUpdateStation(stationToUpdate)
        // console.log('Deleted track id:', trackId)
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

    function toggleLikedTrack(track) {
        updateLikedStation(track)
    }

    return (
        <ul className='playlist-list clean-list'>{tracks.map((track, idx) => (
            <li className={activeId === track.spotifyId ? 'active' : ''}
                onClick={() => setActiveId(track.spotifyId)}
                key={track.spotifyId + idx}>
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
                    <div className={`title ${isPlaying && currTrack.spotifyId === track.spotifyId ? 'active' : ''}`}>{truncateText(track.name, 4)}</div>
                    <div className="artist">{track.artist.name}</div>
                </div>

                <span className='album'>{truncateText(track.album.name, 4)}</span>
                <span className='date'>{track.addedAt ? formatDate(track.addedAt) : ''}</span>

                <span className={`like-btn ${likedTracksIds?.includes(track.spotifyId) ? 'liked' : ''}`}
                    onClick={() => toggleLikedTrack(track)}>
                    {likedTracksIds?.includes(track.spotifyId) ? <VIcon className="v-icon" width="17" height="17" fill="rgb(30, 215, 96)" /> :
                        <AddLibrary className="add-library" fill="#b3b3b3" width="16" height="16" />
                    }

                </span>

                <span className='createdAt'>{track.duration}</span>

                {owner &&
                    <StationMenuModal
                        trigger={
                            <button className="btn-more">
                                <SmallBtnOptions className="small-btn-options" />
                            </button>
                        }
                        options={getMenuOptions(track.spotifyId)}
                    />}
            </li>
        ))}
        </ul>

    )
}
