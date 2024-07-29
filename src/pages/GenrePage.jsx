import {stations} from '../../data/stations'
import { FeaturedPlaylist } from '../cmps/FeaturedPlaylist'

export function GenrePage() {
    const bgColor = 'rgb(217, 25, 141)'

    return (
        <section 
        className="genre-page-container full-details" 
        style={{ background: `linear-gradient(rgb(217, 25, 141) 0%, rgb(18, 18, 18) 30%,rgb(18, 18, 18) 100%)`}}>
            <section className="genre-header">
                <h1 className="genre-title">Music</h1>
            </section>

            <section className="genre-content">
                <FeaturedPlaylist stations={stations} title={'playlist'} startIdx={0} type={'playlist'} />
                <FeaturedPlaylist stations={stations} title={'playlist'} startIdx={7} type={'playlist'} />
                <FeaturedPlaylist stations={stations} title={'playlist'} startIdx={14} type={'playlist'} />

                <FeaturedPlaylist stations={stations} title={'Artists'} startIdx={0} type={'artist'} isRound={true} />


               
            </section>
        </section>
    )
}