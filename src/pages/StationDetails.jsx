import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'


export function StationDetails() {

  const { stationId } = useParams()
  const station = useSelector(storeState => storeState.stationModule.station)

  useEffect(() => {
    loadStation(stationId)
    console.log(station)
  }, [stationId])

  async function onAddStationMsg(stationId) {
    try {
      await addStationMsg(stationId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Station msg added`)
    } catch (err) {
      showErrorMsg('Cannot add station msg')
    }

  }

  function onAdd(){
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
        <div className='listeners'><span>{listeners}</span> monthly listeners</div>
      </div>

      <section className='station-content'>
        <div className='controlls'>
          <button className='btn play'>Play</button>
          <button className='btn pill follow'>follow</button>
        </div>

        <h2>Popular</h2>
        <ul className='clean-list'> {//track list rendering
          tracks.map((track,idx) => (
            <li key={track.id}>
              <span className='track-number'>{idx+1}</span>
              <img src={track.album.images[2].url} />
              <span className='title'>{track.name}</span>
              <span className='listeners'>100000000</span>
              <span onClick={onAdd}> <svg data-encore-id="icon" fill="#b3b3b3" width="14" height="14" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path></svg></span>
              <span className='time'>Time</span>
            </li>
          ))
        }
        </ul>
      </section>



    </section>
  )
}