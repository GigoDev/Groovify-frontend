import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TrackList } from '../../cmps/TrackList'

import { loadStation, clearStation, setTrack, togglePlay, setTracks, updateStation } from '../../store/actions/station.actions'
import { stationService } from '../../services/station'

export function ArtistDetails() {

    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const [opacity, setOpacity] = useState(1);
    const [follow, setIsFollow] = useState('')
    
    const elMainContainer = document.querySelector('.main-container')

    
    useEffect(() => {
        loadStation(id).then(station => {setIsFollow(station.owner)}) //error from this line
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
        if (track.spotifyId === currTrack.spotifyId) return togglePlay() //check if new song

        setTrack(track)
        setTracks()
    }

    async function onAddTrack(track, stationId = '2D2M9') {
        const stationToEdit = await stationService.getById(stationId)
        track.addedAt = new Date().toISOString()
        stationToEdit.tracks.unshift(track)
        const savedStation = await stationService.save(stationToEdit)
        console.log(`${track.name} added to ${stationToEdit.name}`)
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
    const ownerStyle = follow ? { borderColor: 'green' } : { borderColor: 'white' };
    return (
        <section className="station-details-container">

            <div className='hero' style={{ opacity }}>
                <img src={imgs[0].url} alt="hero img" />
            </div>

            <div className='hero-info'>
                <div className='title'>{title}</div>
                <div className='listeners'><span>{listeners?.toLocaleString()}</span> monthly listeners</div>
            </div>

            <section className='station-content'>
                <div className='controlls'>
                    <button className='btn play'>
                        <svg role="img" fill="black" height="20" width="20" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.12L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>
                    </button>
                    <button className='btn pill follow' onClick={handleFollow} style={ownerStyle}>Follow</button>
                </div>

                <h2>Popular</h2>
                <TrackList tracks={tracks} onAddTrack={onAddTrack} onPlay={onPlay} onRemoveTrack={onRemoveTrack} />
            </section>
        </section>
    )
}