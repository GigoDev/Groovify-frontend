import { httpService } from "./http.service"
export const lyricsService = {
    getLyrics
}

async function getLyrics(term = 'Kiss') {
    try {
        const lyrics = await httpService.get('lyrics/', {term})
        console.log('lyrics', lyrics)
        return lyrics
    }
    catch (error) {
        console.log(error)
        throw new Error
    }
}