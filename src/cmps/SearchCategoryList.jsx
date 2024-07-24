import { SearchCategoryPreview } from "./SearchCategoryPreview"

export function SearchCategoryList() {
    const labels = ['Music', 'Podcasts', 'Made For You', 'New Releases', 'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Charts', 'Live Events', 'Dance', 'Mood', 'Indie', 'Workout', 'Discover', 'Country', 'R&B', 'K-pop', 'Chill', 'Sleep', 'Party', 'At Home', 'Decades', 'Romance', 'Metal']
    const colors = ['#8400e7', '#e13300', '#1e3264', '#e8115b', '#148a08', '#bc5900', '#e91429', '#e1118c', '#8d67ab', '#7358ff', '#d84000', '#e1118c', '#e91429', '#777777', '#8d67ab', '#d84000', '#dc148c', '#148a08', '#d84000', '#1e3264', '#537aa1', '#537aa1', '#ba5d07', '#8c1932', '#e91429']


    return (
        <section className="search-category-list">
            <h1>Browse all</h1>
            <div className="category-container">
                {Array.from({ length: 25 }, (_, i) => (
                    <SearchCategoryPreview
                        key={i}
                        style={{ backgroundColor: colors[i] }}
                        label={labels[i]}
                        imgIdx={i + 1}
                    />
                ))}
            </div>
        </section>
    )
}