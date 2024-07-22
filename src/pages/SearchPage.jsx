import { useEffect, useRef, useState } from "react";
import { SearchCategory } from "../cmps/SearchCategory";
import { SearchCategoryList } from "../cmps/SearchCategoryList";
import { getTracks } from "../services/youtube.service";
import { MainSearchPreview } from "../cmps/MainSearchPreview";
import { debounce } from "../services/util.service";


export function SearchPage() {
    const [search, setSearch] = useState("")
    const [tracks, setTracks] = useState([])
    const debouncedLoadTracks = useRef(
        debounce(async (searchTerm) => {
            try {
                const tracks = await getTracks(searchTerm)
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

    return (
        <>
            {search !== "" ? (
                <section className="search-container">
                    <section className="station-search-header">
                        <SearchCategory setSearch={setSearch} />
                    </section>
                </section >
            ) : (
                <section className="search-container">
                    <section className="station-search-header">
                        <SearchCategory setSearch={setSearch} />
                    </section>
                    <SearchCategoryList />
                </section>
            )
            }

            <section className='station-details'>
                {search && tracks.length > 0 ? (
                    tracks.map(track => (
                        <MainSearchPreview key={track.videoId} track={track} />
                    ))
                ) : (
                    search && <p>No songs found</p>
                )}
            </section>
        </>
    )
}