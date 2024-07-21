import LikeIcon from '../../assets/icons/LikeIcon.svg'

export function PlayerLeft() {
    return (
        <div className="left-controls">
            <img className="media-img fit-img" src="http://res.cloudinary.com/dmbgmvobl/image/upload/v1721056820/dkdgpdfddmrsvnyfrjdn.png" alt="img" />
            <div className="artist-details">
                <span className="player-song-name">Songname</span>
            </div>
            <button className="like-btn">
                <LikeIcon />
            </button>
        </div>
    )
}