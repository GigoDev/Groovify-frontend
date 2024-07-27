//REACT&READUX
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { clearStation, loadStation, removeStation, updateStation } from "../../store/actions/station.actions";


import { ImgUploader } from "../../cmps/ImgUploader";
import { formatDurationSec } from "../../services/util.service";
//CMPS
import { PlaylistList } from "../../cmps/PlaylistList";
import { UpdateStationModal } from '../../cmps/UpdateStationModal';

//ICONS
import PlayIcon from '../../assets/icons/PlayIcon.svg'
import DurationIcon from '../../assets/icons/DurationIcon.svg'
import BigBtnOptions from '../../assets/icons/BigBtnOptions.svg'
import AddLibrary from '../../assets/icons/AddLibrary.svg'
import MusicNoteIcon from '../../assets/icons/MusicNoteIcon.svg'
import PencilIcon from '../../assets/icons/PencilIcon.svg'
import DeleteIcon from '../../assets/icons/DeleteIcon.svg'

import { SearchTracks } from '../../cmps/SearchTracks';
import { StationMenuModal } from '../../cmps/StationMenuModal';



export function PlaylistDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    loadStation(id)
  }, [id])


  async function handleDeleteStation() {
    try {
      await removeStation(id)
      navigate('/')
      console.log('id', id)
    } catch (err) {
      console.error('Failed to delete station', err)
    }
  }

  function openEditModal() {
    setIsModalOpen(true)
  }

  async function onUpdateStation(stationToUpdate) {
    try {
      await updateStation(stationToUpdate)
    } catch (error) {
    }
  }

  const menuOptions = [
    {
      label: (
        <>
          <PencilIcon width="18" height="18" fill="#a7a7a7" role="img" aria-hidden="true" />
          Edit details
        </>
      ),
      onClick: () => {
        openEditModal()
      }
    },
    {
      label: (
        <>
          <DeleteIcon width="18" height="18" fill="#a7a7a7" role="img" aria-hidden="true" />
          Delete
        </>
      ),
      onClick: () => {
        handleDeleteStation()
      }
    }
  ]

  if (!station || station.type !== 'playlist') return <h1>Loading...</h1>
  const { imgs, listeners, name, type, tracks, likes, total } = station
  const imgUrl = imgs && imgs.length > 0 ? imgs[0].url : null

  const totalDuration = tracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number)
    return acc + (minutes * 60 + seconds)
  }, 0)
  const formattedDuration = formatDurationSec(totalDuration)
  return (
    <section className="playlist-details content-layout">
      <section className="station-preview flex full">
        <div className="img-container">
          {imgUrl ? <img src={imgUrl} /> : <MusicNoteIcon className="svg-img-uploader" />}
        </div>
        <div className="station-summary">
          <p className="summary-title">{type}</p>
          <h1 className="pointer" onClick={openEditModal}>{name}</h1>
          <div className="mini-dashboard">
            John Doe • {likes?.toLocaleString()} likes • {total} songs
            <span>, <span className="light">{`Total Time: ${formattedDuration}`}</span></span>
          </div>
        </div>
      </section>

      <section className="song-list-container content-layout">
        <section className="playlist-actions">
          <button className="btn-play-green">
            <PlayIcon />
          </button>
          <button className="add-library">
            <AddLibrary />
          </button>
          <div className="flex option-btns">
            <StationMenuModal
              trigger={
                <button className="btn-more">
                  <BigBtnOptions />
                </button>
              }
              options={menuOptions}
            />
          </div>
        </section>

        <div className='list-container'>
          {tracks.length > 0 ? (
            <div className="list-titles">
              <span className="hashtag">#</span>
              <span>Title</span>
              <span className="album">Album</span>
              <span className="date">Date Added</span>
              <div>
                <DurationIcon className="duration" />
              </div>
            </div>
          ) : (null)}

          <PlaylistList station={station} onUpdateStation={onUpdateStation} />
        </div>
      </section>

      <SearchTracks
        station={station}
        onUpdateStation={onUpdateStation} />
      <UpdateStationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        station={station}
        onUpdateStation={onUpdateStation} />
    </section>

  )
}
