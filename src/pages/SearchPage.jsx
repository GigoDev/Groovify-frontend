import { useEffect, useRef, useState } from "react";
import { SearchCategory } from "../cmps/SearchCategory";
import { SearchCategoryList } from "../cmps/SearchCategoryList";
import { MainSearchPreview } from "../cmps/MainSearchPreview";
import { debounce } from "../services/util.service";
import { spotifyService } from "../services/spotify.service";
import SpotifyLoader from '../assets/gifs/SpotifyLoader.gif'


export function SearchPage() {
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
        document.body.style.setProperty('--bg-color', '#121212')
    }, [search])

    return (
        <>
            <section className="search-container">
                <section className="station-search-header">
                    <SearchCategory setSearch={setSearch} />
                </section>
                <section className='station-details'>
                    {search && tracks.length > 0 ? (
                        tracks.map(track => (
                            <MainSearchPreview key={track.videoId} track={track} />
                        ))
                    ) : (
                        search && <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
                    )}
                </section>
                <SearchCategoryList />
            </section>
        </>
    )
}