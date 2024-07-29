import { SearchCategoryPreview } from "./SearchCategoryPreview"

export function SearchCategoryList() {
    const labels = ['Music', 'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Mood', 'Indie', 'Workout', 'Country', 'R&B', 'K-pop', 'Chill', 'Sleep', 'Party', 'Romance', 'Metal']
    const colors = ['#8400e7', '#148a08', '#bc5900', '#e91429', '#e1118c', '#e1118c', '#e91429', '#777777', '#d84000', '#dc148c', '#148a08', '#d84000', '#1e3264', '#537aa1', '#8c1932', '#e91429']


    return (
        <section className="search-category-list">
            <h1>Browse all</h1>
            <div className="category-container">
                {Array.from({ length: 16 }, (_, i) => (
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