export function SearchCategoryPreview({ label, imgIdx, style }) {
    const getImgSrc = (i) => new URL(`../assets/imgs/${i}.jpg`, import.meta.url).href

    return (
        <div className="search-category-card" style={style}>
            <h1>{label}</h1>
            <div className="img-container">
                <img src={getImgSrc(imgIdx)} alt={label} />
            </div>
        </div>
    )
}