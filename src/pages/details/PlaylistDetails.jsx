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


export function PlaylistDetails() {

  const { id } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)
  const currTrack = useSelector(storeState => storeState.playerModule.currTrack)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadStation(id)
    return clearStation()
  }, [id])

  function openEditModal() {
    setIsModalOpen(true)
  }

  if (!station) return <h1>Loading...</h1>
  const { imgs, listeners, name, type, tracks, likes } = station
  const imgUrl = imgs && imgs.length > 0 ? imgs[0].url : null

  const totalDuration = tracks.items.reduce((acc, track) => acc + track.duration, 0)
  const formattedDuration = formatDuration(totalDuration)
  return (
    <section className="playlist-details">
      <section className="station-preview flex full">
        <ImgUploader imgUrl={imgUrl} className="img-uploader-container" />
        <div className="station-summary">
          <p className="summary-title">{type}</p>
          <h1 className="pointer" onClick={openEditModal}>{name}</h1>
          <div className="mini-dashboard">
            John Doe • {likes.toLocaleString()} likes • {tracks.total} songs
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
              <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 uPxdw"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            </button>
          </div>
        </section>


        {tracks.items.length > 0 ? (
          <div className="list-titles">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Date Added</span>
            <DurationIcon className="duration" />
          </div>
        ) : (null)}

        <PlaylistList items={tracks.items} />
      </section>
      <UpdateStationModal
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}/>
    </section>

  )
}
