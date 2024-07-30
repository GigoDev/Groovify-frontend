
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '../assets/icons/SearchIcon.svg'
import XBtnIcon from '../assets/icons/XBtnIcon.svg'
import { SearchTrackPreview } from './SearchTrackPreview'
import { spotifyService } from '../services/spotify.service'
import { debounce } from '../services/util.service'


export function SearchTracks({ onUpdateStation, station }) {
    const [search, setSearch] = useState("")
    const [tracks, setTracks] = useState([])
    const [activeId, setActiveId] = useState('')

    const debouncedLoadTracks = useRef(
        debounce(async (searchTerm) => {
            try {
                const tracks = await spotifyService.getTracks(searchTerm)
                setTracks(tracks)
            } catch (err) {
                console.error("Failed to load tracks:", err)
            }
        }, 1000)
    ).current

    useEffect(() => {
        if (search)  debouncedLoadTracks(search)
    }, [search])

    function addTrack(track) {
        let stationToUpdate = { ...station }
        stationToUpdate.tracks.push(track)
        onUpdateStation(stationToUpdate)
    }


    function handleChange({ target }) {
        setSearch(target.value)
    }

    function clearSearch() {
        setSearch("")
    }

    return (
        <>
            <section className="station-song-search">

                <div>
                    <h1>Let's find something for your playlist</h1>

                    <div className="search-input">
                        {search ? <XBtnIcon onClick={clearSearch} width="16" height="16" className="x-btn" /> : null}
                        <input
                            type="text"
                            value={search}
                            placeholder="Search for songs"
                            onChange={handleChange}
                        />
                        <SearchIcon />
                    </div>



                    {search && (
                        <ul className="track-previews-container clean-list-preview">
                            {tracks?.length > 0 ? (
                                tracks.map(track => (
                                    <li className={activeId === track.spotifyId ? 'active' : ''}
                                        onClick={() => setActiveId(track.spotifyId)}
                                        key={track.spotifyId}>
                                        <SearchTrackPreview
                                            track={track}
                                            addTrack={addTrack} />
                                    </li>
                                ))
                            ) : (
                                <p>No songs found</p>
                            )}
                        </ul>
                    )}
                </div>
            </section>
        </>
    )

}