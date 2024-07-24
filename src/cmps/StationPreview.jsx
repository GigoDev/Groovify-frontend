import MusicNoteIcon from '../assets/icons/MusicNoteIcon.svg'

export function StationPreview({ station }) {
    const { imgs, id, listeners, name, type, tracks } = station

    return (
        <article className="card">
            <div className="card-img-container">
                {imgs[(imgs.length - 1)].url ?
                    <img className="card-img"
                    src={imgs[(imgs.length-1)].url}  />
                    :
                    <MusicNoteIcon />
                }
            </div>
            <span className='card-title'>{name}</span>
        </article>
    )
}