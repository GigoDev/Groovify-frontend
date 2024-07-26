
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '../assets/icons/SearchIcon.svg'
import { SearchTrackPreview } from './SearchTrackPreview'
import { spotifyService } from '../services/spotify.service'
import { debounce } from '../services/util.service'


export function SearchTracks() {
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
                        <div className="track-previews">
                            {tracks?.length > 0 ? (
                                tracks.map(track => (
                                    <SearchTrackPreview key={track.spotifyId} track={track} />
                                ))
                            ) : (
                                <p>No songs found</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    )

}