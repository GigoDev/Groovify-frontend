import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TrackList } from '../cmps/TrackList'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'


export function StationDetails() {

  const { stationId } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)

  useEffect(() => {
    loadStation(stationId)
    // console.log(station)
  }, [stationId])

  function onAddTrack() {
    console.log('add')
  }

  if (!station) return <h1>Loading...</h1>
  const { imgs, listeners, name: title, type, tracks } = station
  return (
    <section className="station-details-container">

      <div className='hero'>
        <img src={imgs[0].url} alt="hero img" />
      </div>

      <div className='hero-info'>
        <div className='title'>{title}</div>
        <div className='listeners'><span>{listeners.toLocaleString()}</span> monthly listeners</div>
      </div>

      <section className='station-content'>
        <div className='controlls'>
          <button className='btn play'>
            <svg role="img" fill="black" height="20" width="20" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.12L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>
          </button>
          <button className='btn pill follow'>follow</button>
        </div>

        <h2>Popular</h2>
        <TrackList tracks={tracks} onAddTrack={onAddTrack}/>
      </section>
    </section>
  )
}