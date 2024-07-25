import { ImgUploader } from "../../cmps/ImgUploader";

import PlayIcon from '../../assets/icons/PlayIcon.svg'
import DurationIcon from '../../assets/icons/DurationIcon.svg'

import { demoAlbum } from "../../../data/demoAlbum.js";
import { AlbumList } from "../../cmps/AlbumList.jsx";
import { formatDuration } from "../../services/util.service.js";

export function AlbumDetails() {
    const album = demoAlbum
    const { name, releaseDate, total, duration, tracks } = album
    const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0)
    const formattedDuration = formatDuration(totalDuration)
    return (
        <section className="album-details">
            <section className="station-preview flex full">
                <ImgUploader className="img-uploader-container" />
                <div className="station-summary">
                    <p className="summary-title">Album</p>
                    <h1 className="pointer">{name}</h1>
                    <div className="mini-dashboard">
                        John Doe • {releaseDate} • {total} songs
                        <span>, <span className="light">{`Total Time: ${formattedDuration}`}</span></span>
                    </div>
                </div>
            </section>

            <section className="song-list-container content-layout">
                <section className="playlist-actions">
                    <button className="btn-play-green">
                        <PlayIcon />
                    </button>
                    <div className="flex option-btns">
                        <button className="btn-more">
                            <svg role="img" height="34" width="34" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 uPxdw"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                        </button>
                    </div>
                </section>
                <div className='list-container'>
                    <div className="list-titles">
                        <span className="hashtag">#</span>
                        <span>Title</span>

                        <DurationIcon className="duration" />
                    </div>

                    <AlbumList tracks={tracks}/>
                </div>
            </section>
        </section>
    )
}