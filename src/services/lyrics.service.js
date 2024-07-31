import { httpService } from "./http.service"
export const lyricsService = {
    getLyrics
}

async function getLyrics(term = 'Kiss', artist = 'Prince') {
    console.log('term', term)
    console.log('term', artist)
    try {
        const lyrics = await httpService.get('lyrics/',{term: term, artist: artist})
        return lyrics
    }
    catch (error) {
        console.log(error)
        throw new Error
    }
}