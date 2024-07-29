import { Link } from "react-router-dom"

export function SearchCategoryPreview({ label, imgIdx, style }) {
    const getImgSrc = (i) => new URL(`../assets/imgs/${i}.jpg`, import.meta.url).href

    function handleClick() {

    }

    return (
        <Link to={`/genre/${label}/${encodeURIComponent(style.backgroundColor)}`}>
            <div className="search-category-card" style={style} onClick={handleClick}>
                <h1>{label}</h1>
                <div className="img-container">
                    <img src={getImgSrc(imgIdx)} alt={label} />
                </div>
            </div>
        </Link>
    )
}