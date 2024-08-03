import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { lyricsService } from '../services/lyrics.service';
import { FastAverageColor } from 'fast-average-color'


export function LyricsPage() {
    const [lyrics, setLyrics] = useState('')
    const [bgColor, setBgColor] = useState('#121212');

    const currTrack = useSelector(storeState => storeState.stationModule.currTrack)
    // console.log('currTrack', currTrack)

    useEffect(() => {
        if (currTrack) {
            getLyrics()
            setBackgroundClr()
        }
    }, [bgColor, currTrack])

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

    async function setBackgroundClr() {
        try {
            const elImg = currTrack?.album.imgs[(currTrack.album.imgs.length - 1)].url
            const color = await extractColor(elImg)
            setBgColor(color)
        } catch (err) {
            console.log('Encountered error', err)
        }
    }

    async function getLyrics() {
        if (currTrack) {
            // console.log('fetching lyrics from api')
            try {
                const res = await lyricsService.getLyrics(currTrack.name, currTrack.artist.name)
                // console.log('res', res)
                // console.log('{ lyrics: res }', { lyrics: res })
                setLyrics(res === '' ? 'Hmm. We don\'t know the lyrics for this one.' : res)
            } catch (error) {
                console.error('Error fetching lyrics:', error)
            }
        } else {
            setLyrics(currTrack)
        }
    }

    const currTrackName = currTrack ? `${currTrack?.artist?.name} ${currTrack?.name}` : ''

    useEffect(() => {
        if (currTrackName) {
            setLyrics('')
            getLyrics()
        }
    }, [currTrack, currTrackName])

    return (
        <section
            className="lyrics-container full-details"
            style={{ backgroundColor: bgColor }}
        >
            {!lyrics ? <h1>Looking for lyrics...</h1> : <pre className="lyrics">{lyrics}</pre>}</section>
    )
}