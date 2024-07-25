import { useEffect, useRef, useState } from 'react'
import { playlists as DB } from '../../data/playlists'
import useBreakpoint from '../customHooks/useBreakpoint'

export function FeaturedPlaylist({ from, to, title }) {
    const [itemsToShow, setItemsToShow] = useState(7);
    const breakpoint = useBreakpoint();
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


    const data = DB.slice(from, to)
    const list = data.slice(0,itemsToShow)
    if (!list) return <div>Loading...</div>
    return (
        <section className='featured-playlist-container'>
            <h1 className='list-title'>{title}</h1>
            <div className='lists-container'>
                {list.map(item => (
                    <div className='list-item' key={item.spotifyId}>
                        <div className='img-container'>
                            <img src={item.imgs[0].url} alt="" />
                        </div>
                        <div className='title'>{item.name}</div>
                        <div className='description'>{item.description}</div>
                    </div>
                ))
                }
            </div>
        </section>

    )
}