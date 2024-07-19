
export function StationPreview({ station }) {
    const { imgs, id, listeners, name, type, tracks } = station

    return (
        <article className="card">
            <div className="card-img-container square-ratio">
                <img className="card-img" src={imgs[2].url} />
            </div>
            <span className='card-title'>{name}</span>
        </article>
    )
}