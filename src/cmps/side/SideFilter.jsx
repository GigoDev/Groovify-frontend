import { useEffect, useState } from 'react'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'

export function SideFilter({ setFilterBy }) {

    const [isInputVisible, setIsInputVisible] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    function toggleInputVisibility() {
        setIsInputVisible(!isInputVisible)
        setIsButtonClicked(true)
    }

    const handleInput = (ev) => {
        const { target } = ev
        setSearchInput(target.value)
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setFilterBy(filterBy => ({ ...filterBy, txt: searchInput }))
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [searchInput]);

    return (
        <section className='side-filter'>
            <div className={'side-filter-btns'}>
                <button className="btn" onClick={() => setFilterBy(filterBy => ({ ...filterBy, type: 'playlist' }))}>Playlists</button>
                <button className="btn" onClick={() => setFilterBy(filterBy => ({ ...filterBy, type: 'artist' }))}>Artists</button>
            </div>

            <div className="side-search-container">
                <div className="side-search-btn">
                    <button onClick={toggleInputVisibility}>
                        <svg role="img" height="16" width="16" aria-hidden="true" className="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon">
                            <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0  1 .25 7z"></path>
                        </svg>
                    </button>
                    {isInputVisible && (
                        <input
                            type="text"
                            name="txt"
                            id="txt"
                            placeholder="Search in Your Library"
                            className={isInputVisible ? 'input-visible' : ''}
                            value={searchInput}
                            onInput={handleInput}
                        />
                    )}
                </div>
                <div className="side-filter-menu">
                    <button>
                        <span>Recently Added</span>
                        <span aria-hidden="true" className="IconWrapper__Wrapper-sc-16usrgb-0 fYTvv"><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="Svg-sc-ytk21e-0 cAMMLk"><path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"></path></svg></span>
                    </button>
                </div>
            </div>
        </section>
    )
}