import LikeIcon from '../../assets/icons/LikeIcon.svg'

export function PlayerLeft({ album, name }) {
    console.log(album)
    return (
        <div className="left-controls">
            <img className="media-img fit-img" src={`${album.images[2].url}`}/>
            <div className="artist-details">
                <span className="player-song-name">{name}</span>
            </div>
            <button className="like-btn">
                <LikeIcon />
            </button>
        </div>
    )
}