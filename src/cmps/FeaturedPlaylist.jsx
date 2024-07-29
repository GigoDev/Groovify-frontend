import { useEffect, useState } from 'react'
import useBreakpoint from '../customHooks/useBreakpoint'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export function FeaturedPlaylist({ title, from, to, type, isRound }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [itemsToShow, setItemsToShow] = useState(null);
    const style = {
        borderRadius: "50%",

    }
    const breakpoint = useBreakpoint();
    const navigate = useNavigate()
    useEffect(() => {
        switch (breakpoint) {
            case 'large':
                setItemsToShow(10);
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

    const data = stations.filter(station => station.owner !== true && station.type === type).slice(from, to)
    const list = data.slice(0, itemsToShow)
    if (!list) return <div>Loading...</div>
    return (
        <section className='featured-playlist-container'>
            <h1 className='list-title'>{title}</h1>
            <div className='lists-container'>
                {list.map(item => (
                    <div className='list-item' key={item.spotifyId} onClick={() => handleClick(item.type, item._id, item.spotifyId)}>
                        <div className='img-container' >
                            <img src={item.imgs[0].url} alt="" style={isRound ? style : null}/>
                        </div>
                        <div className='title'>{item.name}</div>
                        <div className={'description'}>{type!='artist'? item.description : 'Artist'}</div>
                    </div>
                ))
                }
            </div>
        </section>

    )
}