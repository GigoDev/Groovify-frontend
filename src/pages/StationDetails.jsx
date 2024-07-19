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
    if (!station) return <h1>Loading...</h1>
    const { imgs, listeners, name: title, type, tracks } = station
    return (
        <section className="station-details">

            <div className='hero-container'>
                <img src={imgs[0].url} alt="hero img" />
            </div>

            <section className='station-content'>
                <div className='title-container'>
                    <div className='title'>{title}</div>
                    <div className='listeners'>{listeners}</div>
                </div>

                <div className='controlls'>
                    <button className='play'></button>
                    <button className='follow'></button>
                </div>

                <h2>Popular</h2>
                <ul> {//track list rendering
                    tracks.map(track => (
                        <li key={track.id}>
                            <img src={track.album.images[2].url}/>
                            <span className='title'>{track.name}</span>
                            <span className='listeners'>Listeneres</span>
                            <i>add</i>
                            <span className='time'>Time</span>
                            
                        </li>
                    ))
                }
                </ul>
            </section>



        </section>
    )
}