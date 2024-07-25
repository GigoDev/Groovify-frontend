import { formatDuration2 } from "../services/util.service";

export function AlbumList({ tracks }) {
    return (
        <ul className='album-list clean-list'>{tracks.map((track, idx) => (
            <li key={idx}>
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

                <div className="album-container">
                    <div className='name'>
                        <div className="title">{track.name}</div>
                        <div className="artist">{track.artist.name}</div>
                    </div>
                </div>
                <span className='createdAt'>{formatDuration2(track.duration)}</span>

            </li>
        ))}
        </ul>

    )
}
