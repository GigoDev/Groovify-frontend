
export function StationPreview({ station}) {

    return (
        <article className="station-preview">
            <div className="img-container">
                <img className="station-img" src={station.imgUrl} alt={`${station.name}`} />
            </div>

            <div className="station-content">
                <h3 className="station-name">{station.name}</h3>
                <h5 className="station-desc">{station.desc}</h5>
            </div>
        </article>
    )
}