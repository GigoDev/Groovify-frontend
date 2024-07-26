import { formatDate } from "../services/util.service"
import SmallBtnOptions from '../assets/icons/SmallBtnOptions.svg'
import LikeIcon from '../assets/icons/LikeIcon.svg'
import RemoveBinIcon from '../assets/icons/RemoveBinIcon.svg'
import { StationMenuModal } from "./StationMenuModal"


export function PlaylistList({ items, handleDeleteItem }) {

    async function handleDelete(itemId) {
        try {
            const newItems = items.filter(item => item.id !== itemId)
            handleDeleteItem(newItems)

            console.log('Deleted item id:', itemId)
        } catch (err) {
            console.error('Failed to delete item', err)
        }
    }

    function getMenuOptions(itemId) {
        return [
            {
                label: (
                    <>
                        <RemoveBinIcon width="18" height="18" fill="#a7a7a7" role="img" aria-hidden="true" />
                        Remove from this playlist
                    </>
                ),
                onClick: () => handleDelete(itemId)
            }
        ]
    }
    return (
        <ul className='playlist-list clean-list'>{items.map((item, idx) => (
            <li key={item.spotifyId}>
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
                <span className='date'>{item.addedAt ? formatDate(item.addedAt) : ''}</span>

                <button className="btn-like">
                    <LikeIcon className="like-icon" />
                </button>

                <span className='createdAt'>{item.duration}</span>

                <StationMenuModal
                    trigger={
                        <button className="btn-more">
                            <SmallBtnOptions className="small-btn-options" />
                        </button>
                    }
                    options={getMenuOptions(item.id)}
                />
            </li>
        ))}
        </ul>

    )
}
