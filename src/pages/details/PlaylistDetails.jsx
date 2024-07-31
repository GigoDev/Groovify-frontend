//REACT&READUX
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { clearStation, loadStation, removeStation, setPlayingStation, setTrack, togglePlay, updateStation } from "../../store/actions/station.actions";


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
import PauseIcon from '../../assets/icons/PauseIcon.svg'
import SpotifyLoader from '../../assets/gifs/SpotifyLoader.gif'

import { SearchTracks } from '../../cmps/SearchTracks';
import { StationMenuModal } from '../../cmps/StationMenuModal';
import { FastAverageColor } from 'fast-average-color'



export function PlaylistDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const station = useSelector(storeState => storeState.stationModule.station)
  const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
  const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
  // const likedTracksIds = useSelector(storeState => storeState.stationModule.stations.find((station) => station.name === 'Liked Songs')).tracks.map(track => track.spotifyId)
  const [isFollow, setIsFollow] = useState(false)


  async function extractColor(stationImgUrl) {
    if (!stationImgUrl) return '#121212'
    const fac = new FastAverageColor()
    try {
      const { hex } = await fac.getColorAsync(stationImgUrl)
      return hex
    } catch (error) {
      console.error('Error extracting color:', error)
      return '#121212'
    }
  }
  useEffect(() => {
    loadStation(id)
    return async () => {
      await clear()

    }
  }, [id])

  useEffect(() => {
    // Check if the user is already following the station
    const loggedInUser = userService.getLoggedinUser()
    if (station && station.followBy) {
      const isUserFollowing = station.followBy.some(user => user.userId === loggedInUser._id)
      setIsFollow(isUserFollowing);
    }
  }, [station]);


  async function clear() {
    await clearStation()
  }

  async function setBackgroundColor() {
    try {

      const color = await extractColor(station?.imgs[0].url)
      document.body.style.setProperty('--bg-color', color)
    } catch (err) {
      console.log('Ecountered error', err)
    }

  }
  async function handleDeleteStation() {
    try {
      await removeStation(id)
      navigate('/')
      console.log('id', id)
    } catch (err) {
      console.error('Failed to delete station', err)
    }
  }


  function onPlay(ev, track) {
    ev.stopPropagation()
    setSelectedTrack(track)
    if (track.spotifyId === currTrack.spotifyId) return togglePlay()

    setTrack(track)
    setPlayingStation()
  }

  function handlePlayPause() {
    if (!isPlaying) {
      if (selectedTrack) {
        setTrack(selectedTrack)
      } else if (tracks.length > 0) {
        setTrack(tracks[0])
      }
      setPlayingStation()
    }
    togglePlay()
  }



  function openEditModal() {
    if (!station.owner || station.name === 'Liked Songs') return
    setIsModalOpen(true)
  }

  async function onUpdateStation(stationToUpdate) {
    try {
      await updateStation(stationToUpdate)
    } catch (error) {
      console.log(error)
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

  async function handleFollow() {//work for initial state and for update state
    const loggedinUser = userService.getLoggedinUser()
    const stationToUpdate = { ...station }

    if (stationToUpdate.followBy) {
      const idx = stationToUpdate.followBy.findIndex(user => user.userId === loggedinUser._id)
      if (idx >= 0) {
        stationToUpdate.followBy.splice(idx, 1) //remove
        setIsFollow(false)
      }
      else {
        stationToUpdate.followBy.push({ userId: loggedinUser._id }) //add
        setIsFollow(true)
      }
    } else {
      stationToUpdate.followBy = [{ userId: loggedinUser._id }] //add
      setIsFollow(true)
    }

    updateStation(stationToUpdate)
  }


  if (!station || station.type !== 'playlist') return <div className='spotify-loader-container'><img src={SpotifyLoader} className='spotify-loader' alt="Spotify Loader" /></div>
  setBackgroundColor()
  const { imgs, listeners, name, type, tracks, likes, total, owner } = station
  const imgUrl = imgs && imgs.length > 0 ? imgs[0].url : null
  const totalDuration = tracks?.reduce((acc, track) => {
    const [minutes, seconds] = track.duration?.split(':').map(Number)
    return acc + (minutes * 60 + seconds)
  }, 0)
  const formattedDuration = formatDurationSec(totalDuration)
  const followStyle = isFollow ? { fill: 'green' } : { fill: 'white' };

  return (
    <section className="playlist-details full-details content-layout">
      <section className="station-preview flex full">
        <div className="img-container">
          {owner?._id && name !== 'Liked Songs' ? (
            imgUrl ? <img onClick={openEditModal} src={imgUrl} /> : <MusicNoteIcon onClick={openEditModal} />
          ) : (

            <img src={imgUrl} />
          )}
        </div>
        <div className="station-summary">
          <p className="summary-title">{type}</p>

          <h1 className="pointer" onClick={openEditModal}>{name}</h1>
          {!station.tracks.length &&
            <div className="mini-dashboard">
              John Doe • {likes?.toLocaleString()} likes • {total} songs
              <span>, <span className="light">{`Total Time: ${formattedDuration}`}</span></span>
            </div>}

        </div>
      </section>

      <section className="song-list-container content-layout">
        <section className="playlist-actions">
          {!!station.tracks.length &&
            (<button className="btn-play-green" onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            )}
          {!station.owner && (<button onClick={handleFollow} className="add-library">
            <AddLibrary style={followStyle} />
          </button>)}

          {station.name === 'Liked Songs' ||
            (<div className="flex option-btns">
              <StationMenuModal
                trigger={
                  <button className="btn-more">
                    <BigBtnOptions />
                  </button>
                }
                options={menuOptions}
              />
            </div>)}

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

          <PlaylistList station={station} onUpdateStation={onUpdateStation} onPlay={onPlay} />
        </div>
      </section>

      {(station.name !== 'Liked Songs' && station.owner) && (
        <SearchTracks
          station={station}
          onUpdateStation={onUpdateStation} />

      )}

      <UpdateStationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        station={station}
        onUpdateStation={onUpdateStation} />
    </section>

  )
}
