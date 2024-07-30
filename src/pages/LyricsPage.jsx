import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { updateTrackLyrics } from '../store/actions/station.actions';
import { lyricsService } from '../services/lyrics.service';
import { FastAverageColor } from 'fast-average-color';

export function LyricsPage() {
    const [backgroundColor, setBackgroundColor] = useState('#121212')
    const [lyrics, setLyrics] = useState('')
        
    const currTrack = useSelector(storeState => storeState.stationModule.station)
    async function getLyrics() {
        if (!currTrack) {
            console.log('fetching lyrics from api')
            try {
                const res = await lyricsService.getLyrics(currTrack)
                console.log('res', res)
                updateTrackLyrics(res)
                console.log(currTrack)
                setLyrics(res === '' ? 'No lyrics found' : res)
            } catch (error) {
                console.error('Error fetching lyrics:', error)
            }
        } else {
            console.log('got lyrics from storage')
            setLyrics(currTrack)
        }
    }

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

    async function backgroundColorImg() {
        try {
            const elImg = currTrack?.imgs?.[0]?.url
            const color = await extractColor(elImg)
            setBackgroundColor(color)
        } catch (err) {
            console.log('Encountered error', err)
        }
    }

    const artist = currTrack?.artist[0]?.name
    const title = currTrack?.title
    const currTrackName = `${artist} ${title}`

    useEffect(() => {
        if (currTrackName) {
            setLyrics('')
            getLyrics()
            backgroundColorImg()
        }
    }, [currTrack, currTrackName])

    return (
        <section
            className="lyrics-container"
            style={{ backgroundColor }}
        >
            {!lyrics ? <h1>Looking for lyrics...</h1> : <h1 className="lyrics">{lyrics}</h1>}
        </section>
    )
}