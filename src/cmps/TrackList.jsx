import { useState } from "react";
import { Link } from "react-router-dom";
import PlayIcon from '../assets/icons/PlayIcon.svg';
import PauseIcon from '../assets/icons/PauseIcon.svg';
import VIcon from '../assets/icons/VIcon.svg';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Equalizer from '../assets/gifs/Equalizer.gif';
import { updateLikedStation } from "../store/actions/station.actions";

export function TrackList({ tracks, onPlay }) {
    const initialTrackLength = tracks.length >= 5 ? 5 : tracks.length
    const [visibleTracks, setVisibleTracks] = useState(initialTrackLength)
    const [trackList, setTrackList] = useState(tracks.slice(0, initialTrackLength))
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const likedTracksIds = useSelector(storeState => storeState.stationModule.stations.find((station) => station.name === 'Liked Songs')).tracks.map(track => track.spotifyId)

    function handleMoreLessClick() {
        if (tracks.length < 5) return
        else if (visibleTracks === 5) {
            setVisibleTracks(tracks.length)
            setTrackList(tracks)
        } else if (visibleTracks > 5) {
            setVisibleTracks(5)
            setTrackList(tracks.slice(0, 5))
        }
    }
   
    function toggleLikedTrack(track) {
        updateLikedStation(track)
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return

        const items = Array.from(trackList)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setTrackList(items)
    }

    if (!tracks) return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tracks">
                {(provided) => (
                    <ul className='track-list clean-list' {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            trackList.slice(0, visibleTracks).map((track, idx) => (
                                <Draggable key={track.spotifyId} draggableId={track.spotifyId} index={idx}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <span className='play-btn' onClick={(event) => onPlay(event, track)}>
                                                {isPlaying && currTrack.spotifyId === track.spotifyId ?
                                                    <PauseIcon /> : <PlayIcon />}
                                            </span>
                                            <span className={`track-number ${isPlaying && currTrack.spotifyId === track.spotifyId ? 'active' : ''}`}>
                                                {isPlaying && currTrack.spotifyId === track.spotifyId ? (
                                                    <img src={Equalizer} alt="Equalizer" className='equalizer equalizer-gif' />
                                                ) : (
                                                    idx + 1
                                                )}
                                            </span>
                                            <img src={track.album.imgs.at(-1).url} alt="Album Art" />
                                            <Link className={isPlaying && currTrack.spotifyId === track.spotifyId ? 'active title' : 'title'}>{track.name}</Link>
                                            <span className='listeners' >1,000,000</span>
                                            <span className={`like-btn ${likedTracksIds.includes(track.spotifyId) ? 'liked' : ''}`}
                                                onClick={() => toggleLikedTrack(track)}>
                                                {likedTracksIds.includes(track.spotifyId) ? <VIcon className="v-icon" width="17" height="17" fill="rgb(30, 215, 96)" /> :
                                                    <svg data-encore-id="icon" className="add-library" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16">
                                                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                                                        <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
                                                    </svg>
                                                }
                                            </span>
                                            <span className='time'>{track.duration}</span>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            <button className="btn show-more" onClick={handleMoreLessClick}>
                {visibleTracks > 5 ? 'Show less' : 'See more'}
            </button>
        </DragDropContext>
    )
}
