
export function StationPreview({ station, isMini, setActiveStation, activeStation }) {

    function getPlayBtn() {
        const isCurrentStation = activeStation === station
        return (
            <button
                className={`preview-play-btn ${activeStation == station ? 'static' : ''}`}>
                {!isCurrentStation ? (<svg width='24' height='24' viewBox="0 0 24 24">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                    </path>
                </svg>
                ) : (
                    <svg width='24' height='24' viewBox="0 0 24 24">
                        <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z">
                        </path>
                    </svg>
                )}
            </button >
        )
    }
    return (
        <article className="station-preview">
            {isMini && getPlayBtn()}
            <div className="img-container">
                <img className="station-img" src={station.imgUrl} alt={`${station.name}`} />
                {!isMini && getPlayBtn()}
            </div>

            <div className="station-content">
                <h3 className="station-name">{station.name}</h3>
                {!isMini && <h5 className="station-desc">{station.desc}</h5>}
            </div>
        </article>
    )
}