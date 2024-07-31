import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TrackList } from '../../cmps/TrackList'


import { loadStation, clearStation, setTrack, togglePlay, updateStation, updateLikedStation, setPlayingStation } from '../../store/actions/station.actions'
import { stationService } from '../../services/station'

import PlayIcon from '../../assets/icons/PlayIcon.svg'
import PauseIcon from '../../assets/icons/PauseIcon.svg'
import SpotifyLoader from '../../assets/gifs/SpotifyLoader.gif'
import { userService } from '../../services/user'



export function ArtistDetails() {

    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)

    const [selectedTrack, setSelectedTrack] = useState(null)
    const [opacity, setOpacity] = useState(1);
    const [isFollow, setIsFollow] = useState(false)

    const elMainContainer = document.querySelector('.main-container')

    useEffect(() => {
        loadStation(id)
        elMainContainer?.addEventListener('scroll', handleScroll)
        document.body.style.setProperty('--bg-color', '#121212')


        return async () => {
            elMainContainer?.removeEventListener('scroll', handleScroll);
            await clear()
        }
    }, [id])

    useEffect(() => {
        // Check if the user is already following the station
        const loggedInUser = userService.getLoggedinUser()
        if (station && station.followBy  ) {
            const isUserFollowing = station.followBy.some(user => user.userId === loggedInUser._id)
            setIsFollow(isUserFollowing);
        }
    }, [station]);



    async function clear() {
        await clearStation()
    }

    function handleScroll() {
        const scrollTop = elMainContainer.scrollTop;
        const maxScroll = elMainContainer.scrollHeight - elMainContainer.clientHeight;
        const scrollFraction = scrollTop / maxScroll;
        setOpacity(1 - scrollFraction * 2);
    }

    async function handleFollow() {//work for initial state and for update state
        const loggedinUser = userService.getLoggedinUser()
        const stationToUpdate = { ...station }

        if (stationToUpdate.followBy) {
            const idx = stationToUpdate.followBy.findIndex(user => user.userId === loggedinUser._id)
            if (idx >= 0) {
                stationToUpdate.followBy.splice(idx, 1) //remove
                setIsFollow(false)
            }
            else {
                stationToUpdate.followBy.push({ userId: loggedinUser._id }) //add
                setIsFollow(true)
            }
        } else {
            stationToUpdate.followBy = [{ userId: loggedinUser._id }] //add
            setIsFollow(true)
        }

        updateStation(stationToUpdate)
    }

    function onPlay(ev, track) {
        ev.stopPropagation()
        setSelectedTrack(track)
        if (track.spotifyId === currTrack.spotifyId) return togglePlay() // check if new track was clicked

        setTrack(track)
        setPlayingStation()
    }

    function handlePlayPause() {
        if (!isPlaying) {
            if (selectedTrack) {
                setTrack(selectedTrack)
            } else if (tracks.length > 0) {
                setTrack(tracks[0])
            }
            setPlayingStation()
        }
        togglePlay()
    }
    if (!station || station.type !== 'artist') return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
    const { imgs, listeners, name: title, type, tracks, owner } = station
    const followStyle = isFollow ? { borderColor: 'green' } : { borderColor: 'white' };
    return (
        <section className="station-details-container full-details">

            <div className='hero' style={{ opacity }}>
                <img src={imgs[0].url} alt="hero img" />
            </div>

            <div className='hero-info'>
                <div className='title'>{title}</div>
                <div className='listeners'><span>{listeners?.toLocaleString()}</span> monthly listeners</div>
            </div>

            <section className='station-content'>
                <div className='controlls'>
                    <button className='btn play' onClick={handlePlayPause}>
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn pill follow' onClick={handleFollow} style={followStyle}>Follow</button>
                </div>

                <h2>Popular</h2>
                <TrackList tracks={tracks} onPlay={onPlay} />
            </section>
        </section>
    )
}