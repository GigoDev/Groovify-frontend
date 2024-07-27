
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '../assets/icons/SearchIcon.svg'
import { SearchTrackPreview } from './SearchTrackPreview'
import { spotifyService } from '../services/spotify.service'
import { debounce } from '../services/util.service'


export function SearchTracks({ onUpdateStation, station }) {
    const [search, setSearch] = useState("")
    const [tracks, setTracks] = useState([])
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
        if (search) {
            debouncedLoadTracks(search)
        }
    }, [search])

    function addTrack(track) {
        let stationToUpdate = { ...station }
        stationToUpdate.tracks.push(track)
        onUpdateStation(stationToUpdate)
    }


    function handleChange({ target }) {
        setSearch(target.value)
    }


    return (
        <>
            <section className="station-song-search">

                <div>
                    <h1>Let's find something for your playlist</h1>

                    <div className="search-input">

                        <input
                            type="search"
                            placeholder="Search for songs"
                            onChange={handleChange}
                        />
                        <SearchIcon />
                    </div>



                    {search && (
                        <ul className="track-previews-container">
                            {tracks?.length > 0 ? (
                                tracks.map(track => (
                                    <li className='clean-list track-previews' key={track.spotifyId}>
                                        <SearchTrackPreview
                                            track={track} />
                                        <button
                                            onClick={() => addTrack(track)}
                                            className="btn-add-song pill">Add</button>
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