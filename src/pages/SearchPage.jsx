import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'


import { SearchCategory } from "../cmps/SearchCategory";
import { SearchCategoryList } from "../cmps/SearchCategoryList";
import { MainSearchPreview } from "../cmps/MainSearchPreview";
import { debounce } from "../services/util.service";
import { spotifyService } from "../services/spotify.service";
import SpotifyLoader from '../assets/gifs/SpotifyLoader.gif'
import { setPlayingStation, setTrack, togglePlay } from "../store/actions/station.actions";


export function SearchPage() {
    const search = useSelector(storeState => storeState.stationModule.search)
    const [tracks, setTracks] = useState(null)
    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    const debouncedLoadTracks = useRef(
        debounce(async (searchTerm) => {
            // console.log('searchTerm ',searchTerm)
            try {
                const tracks = await spotifyService.getTracks(searchTerm)
                setTracks(tracks)
            } catch (err) {
                console.error("Failed to load tracks:", err)
            }
        }, 500)
    ).current

    useEffect(() => {
        if (search) {
            debouncedLoadTracks(search)
        }
        document.body.style.setProperty('--bg-color', '#121212')
    }, [search])

    function onPlay(ev, track) {
        ev.stopPropagation()

        if (track.spotifyId === currTrack.spotifyId) return togglePlay() // check if new track was clicked
        let currStation = {}
        currStation.tracks = tracks
        setTrack(track)
        setPlayingStation(currStation)
    }
    
    return (
        <>
            <section className="search-container">
                {/* <section className="station-search-header">
                    <SearchCategory  />
                </section> */}
                <ul className='station-details clean-list'>
                    {search && tracks?.length > 0 ? (
                        tracks.map(track => (
                            <MainSearchPreview key={track.spotifyId}
                             track={track}
                             onPlay={onPlay}
                             currTrack={currTrack} />
                        ))
                    ) : (
                        search && <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
                    )}
                </ul>
                <SearchCategoryList />
            </section>
        </>
    )
}