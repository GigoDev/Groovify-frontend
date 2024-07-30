import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { updateTrackLyrics } from '../store/actions/station.actions'
import { lyricsService } from '../services/lyrics.service'

export function LyricsPage() {
    const [lyrics, setLyrics] = useState('')
    const lyricsContainer = useRef(null)

    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)

    async function getLyrics() {
        if (!currTrack.lyrics) {
            console.log('fetching lyrics from api');
            try {
                console.log('res', res)
                const res = await lyricsService.getLyrics(currTrackName)
                updateTrackLyrics(res)
                setLyrics(res === '' ? 'No lyrics found' : res)
            } catch (error) {
                console.error('Error fetching lyrics:', error)
            }
        } else {
            console.log('got lyrics from storage')
            setLyrics(currTrack.lyrics)
        }
    };

    async function extractColor(stationImgUrl) {
        if (!stationImgUrl) return '#121212'
        const fac = new FastAverageColor()
        try {
            const { hex } = await fac.getColorAsync(stationImgUrl)
            return hex
        } catch (error) {
            console.error('Error extracting color:', error)
            return '#121212'
        }
    }

    async function setBackgroundColor() {
        try {

            const elImg = currTrack?.imgUrl[0].url
            const color = await extractColor(elImg)
            return color
        } catch (err) {
            console.log('Encountered error', err)
        }
    }

    const artist = currTrack?.artists[0].name
    const title = currTrack?.title
    const currTrackName = `${artist} ${title}`

    useEffect(() => {
        if (currTrackName) {
            setLyrics('')
            getLyrics()
            setBackgroundColor()
        }
    }, [currTrackName])
    return (
        <section ref={lyricsContainer} className="lyrics-container">
            {!lyrics ? <h1>Looking for lyrics...</h1> : <h1 className="lyrics">{lyrics}</h1>}
        </section>
    )
}

export default LyricsPage;
