import MusicNoteIcon from '../assets/icons/MusicNoteIcon.svg'

export function MiniStationPreview({ station }) {
    const { imgs, id, listeners, name, type, tracks } = station

    return (
        <article className="mini-card">
            <div className="mini-card-img-container square-ratio">
                {imgs[(imgs.length - 1)].url ?
                    <img className="mini-card-img"
                    src={imgs[(imgs.length-1)].url}  />
                    :
                    <MusicNoteIcon />
                }
            </div>
            <span className='mini-card-title'>{name}</span>
        </article>
    )
}