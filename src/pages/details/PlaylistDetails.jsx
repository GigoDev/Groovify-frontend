import { ImgUploader } from "../../cmps/ImgUploader";
import { PlaylistList } from "../../cmps/PlaylistList";
import PauseIcon from '../../assets/icons/PauseIcon.svg'
import DurationIcon from '../../assets/icons/DurationIcon.svg'

export function PlaylistDetails() {
  return (
    <section className="playlist-details">

      <section className="station-preview flex full">
        <ImgUploader className="img-uploader-container" />
        <div className="station-summary">
          <p className="summary-title">PLAYLIST</p>
          <h1 className="pointer">Station Name</h1>
          <p className="mini-dashboard">
            John Doe • 0 likes • 2 songs
            <span>, <span className="light">Total Time</span></span>
          </p>
        </div>
      </section>
      <section className="song-list-container content-layout">
        <section className="playlist-actions">

          <button className="btn-play-green">
            <PauseIcon />
          </button>
          <div className="flex option-btns">
            <button className="btn-more">
              <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 uPxdw"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            </button>
          </div>
        </section>
        <div className="list-titles">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date Added</span>
          <DurationIcon className="duration" />
        </div>
        <PlaylistList />

      </section>
    </section>

  )
}