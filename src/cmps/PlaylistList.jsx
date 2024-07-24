import { formatDate } from "../services/util.service"

export function PlaylistList({ items }) {
    return (
        <ul className='playlist-list clean-list'>{items.map((item, idx) => (
            <li key={item.id}>
                <span className='play-icon'>
                    <svg width="17" height="17" viewBox="0 0 16 16" >
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                            fill='white'
                            stroke='white'
                            strokeWidth={1}>
                        </path>
                    </svg>
                </span>
                <span className='playlist-number'>{idx + 1}</span>
                <img src={item.album.imgs[(item.album.imgs.length - 1)].url} />

                <div className='name'>
                    <div className="title">{item.name}</div>
                    <div className="artist">{item.artist.name}</div>
                </div>

                <span className='album'>{item.album.name}</span>
                <span className='date'>{item.addedAt? formatDate(item.addedAt) : ''}</span>
                <span className='createdAt'>{item.duration}</span>
            </li>
        ))}
        </ul>

    )
}
