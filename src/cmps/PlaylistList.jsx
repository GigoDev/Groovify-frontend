export function PlaylistList() {
    return (
        <ul className='playlist-list clean-list'>
            <li>
                <span className='playlist-number'>1</span>
                <img src="http://res.cloudinary.com/dmbgmvobl/image/upload/v1721056820/dkdgpdfddmrsvnyfrjdn.png" />

                <div className='name'>
                    <div className="title">Daniel</div>
                    <div className="artist">Artist</div>
                </div>

                <span className='album'>Album</span>
                <span className='date'>June 10, 2000</span>
                <span className='createdAt'>2:00</span>
            </li>

        </ul>

    )
}