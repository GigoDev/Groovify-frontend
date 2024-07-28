import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TrackList } from '../../cmps/TrackList'

import { loadStation, clearStation, setTrack, togglePlay, setTracks, updateStation, updateLikedStation } from '../../store/actions/station.actions'
import { stationService } from '../../services/station'

import PlayIcon from '../../assets/icons/PlayIcon.svg'
import PauseIcon from '../../assets/icons/PauseIcon.svg'


export function ArtistDetails() {

    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)

    const [selectedTrack, setSelectedTrack] = useState(null)
    const [opacity, setOpacity] = useState(1);
    // const [follow, setIsFollow] = useState('')

    const elMainContainer = document.querySelector('.main-container')



    useEffect(() => {
        loadStation(id)
        // .then(station => {setIsFollow(station.owner)}) //error from this line
        elMainContainer?.addEventListener('scroll', handleScroll)




        return async () => {
            elMainContainer?.removeEventListener('scroll', handleScroll);
            await clear()
        }
    }, [id])

    async function clear() {
        await clearStation()
    }

    function handleScroll() {
        const scrollTop = elMainContainer.scrollTop;
        const maxScroll = elMainContainer.scrollHeight - elMainContainer.clientHeight;
        const scrollFraction = scrollTop / maxScroll;
        setOpacity(1 - scrollFraction);
    }

    async function handleFollow() {
        return
        if (follow) {
            updateStation({ ...station, owner: null })
            setIsFollow(null)
        }
        else {
            updateStation({ ...station, owner: true })
            setIsFollow(true)
        }
    }

    function onPlay(ev, track) {
        ev.stopPropagation()
        setSelectedTrack(track)
        if (track.spotifyId === currTrack.spotifyId) return togglePlay() // check if new track was clicked

        setTrack(track)
        setTracks()
    }

    function handlePlayPause() {
        if (!isPlaying) {
            if (selectedTrack) {
                setTrack(selectedTrack)
            } else if (tracks.length > 0) {
                setTrack(tracks[0])
            }
            setTracks()
        }
        togglePlay()
    }



    async function onRemoveTrack(trackToRemove, stationId = '2D2M9') {
        const stationToEdit = await stationService.getById(stationId)
        const newTracks = stationToEdit.tracks.filter(track => track.spotifyId !== trackToRemove.spotifyId)
        stationToEdit.tracks = newTracks
        const savedStation = await stationService.save(stationToEdit)
        console.log(`${trackToRemove.name} removed from ${stationToEdit.name}`)
    }

    if (!station || station.type !== 'artist') return <h1>Loading...</h1>
    const { imgs, listeners, name: title, type, tracks, owner } = station
    // const ownerStyle = follow ? { borderColor: 'green' } : { borderColor: 'white' };
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
                    <button className='btn pill follow' onClick={handleFollow} >Follow</button>
                </div>

                <h2>Popular</h2>
                <TrackList tracks={tracks} onPlay={onPlay} onRemoveTrack={onRemoveTrack} />
            </section>
        </section>
    )
}