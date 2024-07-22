
import SearchIcon from '../assets/icons/SearchIcon.svg'
import { SearchTrackList } from './SearchTrackList'


export function SearchTracks() {
    return (
        <section className="station-song-search flex">
            <div>
                <h1>Let's find something for your playlist</h1>
                <div className="search-input">
                    <input
                        type="search"
                        placeholder="Search for songs"
                    />
                    <SearchIcon className="search-svg" />
                    <SearchTrackList />
                </div>
            </div>
        </section>
    )
}