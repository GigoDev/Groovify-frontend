import { useEffect, useState } from 'react'
import useBreakpoint from '../customHooks/useBreakpoint'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import PlayIcon from '../assets/icons/PlayIcon.svg'
import PauseIcon from '../assets/icons/PauseIcon.svg'
import { setPlayingStation, setTrack, togglePlay } from '../store/actions/station.actions';


export function FeaturedPlaylist({ stations, title, startIdx, type, isRound }) {
    // const stations = useSelector(storeState => storeState.stationModule.stations)
    const isPlaying = useSelector(storeState => storeState.stationModule.isPlaying)
    const currPlayingStation = useSelector(storeState => storeState.stationModule.currPlayingStation)

    function onPreviewPlay(event, station) {
        event.stopPropagation()
        event.preventDefault()
        if (currPlayingStation._id === station._id) return togglePlay()
        setTrack(station.tracks[0])
        setPlayingStation(station)
    }

    const [itemsToShow, setItemsToShow] = useState(null);
    const style = {
        borderRadius: "50%",

    }
    const breakpoint = useBreakpoint();
    const navigate = useNavigate()
    useEffect(() => {
        switch (breakpoint) {
            case 'large':
                setItemsToShow(7);
                break;
            case 'medium':
                setItemsToShow(6);
                break;
            case 'small':
                setItemsToShow(5);
                break
            case 'xSmall':
                setItemsToShow(4);
                break
            case 'xxSmall':
                setItemsToShow(3);
                break
            default:
                setItemsToShow(1);
                break;
        }
    }, [breakpoint]);



    function handleClick(type, _id, spotifyId) {
        navigate(`${type}/${_id}`)
    }

    const data = stations.filter(station => station.owner !== true && station.type === type).slice(startIdx, startIdx + 7)
    const list = data.slice(0, itemsToShow)
    if (!list) return <div>Loading...</div>
    return (
        <section className='featured-playlist-container'>
            <h1 className='list-title'>{title}</h1>
            <div className='lists-container'>
                {list.map(item => (
                    <div className='list-item' key={item.spotifyId} onClick={() => handleClick(item.type, item._id, item.spotifyId)}>
                        <div className='img-container' >
                            <img src={item.imgs[0].url} alt="" style={isRound ? style : null} />
                        </div>
                        <div className='title'>{item.name}</div>
                        <div className={'description'}>{type != 'artist' ? item.description : 'Artist'}</div>
                        <button className="btn-play-green" onClick={(ev) => onPreviewPlay(ev, item)}>
                            {isPlaying && currPlayingStation._id === item._id ? <PauseIcon /> : <PlayIcon />}
                        </button>
                    </div>
                ))
                }
            </div>
        </section>

    )
}