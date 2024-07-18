
export function StationPreview({station}) {
    const {imgs, id, listeners, name, type, tracks} = station
    console.log(station)

    
    return (
        <article className="station-preview">
            <div className="img-container">
                <img className="station-img" src={imgs[1].url}/>
            </div>
                <span className='name'>{name}</span>
        </article>
    )
}