//REACT&READUX
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { clearStation, loadStation } from "../../store/actions/station.actions";


import { ImgUploader } from "../../cmps/ImgUploader";
import { formatDuration } from "../../services/util.service";
//CMPS
import { PlaylistList } from "../../cmps/PlaylistList";
import { UpdateStationModal } from '../../cmps/UpdateStationModal';

//ICONS
import PlayIcon from '../../assets/icons/PlayIcon.svg'
import DurationIcon from '../../assets/icons/DurationIcon.svg'
import { SearchTracks } from '../../cmps/SearchTracks';


export function PlaylistDetails() {

  const { id } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadStation(id)
    return async () => {
      await clear()
    }
  }, [id])

  async function clear() {
    await clearStation()

  }


  function openEditModal() {
    setIsModalOpen(true)
  }

  if (!station || station.type !== 'playlist') return <h1>Loading...</h1>
  const { imgs, listeners, name, type, tracks, likes, total } = station
  const imgUrl = imgs && imgs.length > 0 ? imgs[0].url : null

  const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0)
  const formattedDuration = formatDuration(totalDuration)
  return (
    <section className="playlist-details content-layout">
      <section className="station-preview flex full">
        <ImgUploader imgUrl={imgUrl} className="img-uploader-container" />
        <div className="station-summary">
          <p className="summary-title">{type}</p>
          <h1 className="pointer" onClick={openEditModal}>{name}</h1>
          <div className="mini-dashboard">
            John Doe • {likes.toLocaleString()} likes • {total} songs
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
          {tracks.length > 0 ? (
            <div className="list-titles">
              <span className="hashtag">#</span>
              <span>Title</span>
              <span className="album">Album</span>
              <span className="date">Date Added</span>
              <DurationIcon className="duration" />
            </div>
          ) : (null)}

          <PlaylistList items={tracks} />
        </div>
      </section>

      <SearchTracks />
      <UpdateStationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen} />
    </section>

  )
}
