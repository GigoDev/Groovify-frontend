import { playlists as DB } from '../../data/playlists'

export function FeaturedPlaylist({from,to,title}) {

    const list = DB.slice(from,to)
    return (
        <section className='featured-playlist-container'>
            <h1 className='list-title'>{title}</h1>
            <div className='lists-container'>
                {list.map(item => (
                    <div className='list-item' key={item.id}>
                        <div className='img-container'>
                            <img src={item.imgs[0].url} alt="" />
                        </div>
                        <div className='title'>{item.title}</div>
                        <div className='description'>{item.description}</div>
                    </div>
                ))
                }
            </div>
        </section>

    )
}