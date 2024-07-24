import { storageService } from '../async-storage.service.js'
import { makeId, saveToStorage } from '../util.service.js'
import { userService } from '../user'
import { stations as dataStations, stations } from '../../../data/stations.js'

//local storage keys
const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg,
    getDefaultTrack,
    setPrevNextTrack
}
// window.cs = stationService

async function query(filterBy = { txt: '' }) {
    let stations = await storageService.query(STORAGE_KEY)
    if (!stations || stations.length === 0) {
        saveToStorage(STORAGE_KEY, dataStations)

        stations = dataStations.slice()
    }
    const { txt } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.vendor) || regex.test(station.description))
    }

    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station.id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

function setPrevNextTrack({ tracks }) {
    tracks.forEach((track, idx) => {
        track.nextId = tracks[idx + 1] || null
        track.prevId = tracks[idx - 1] || null
    })
}

function getDefaultTrack() {
    return {
        id: "1uvyZBs4IZYRebHIB1747m",
        name: "Purple Rain",
        artists: [
            {
                external_urls: {
                    spotify: "https://open.spotify.com/artist/5a2EaR3hamoenG9rDuVn8j"
                },
                href: "https://api.spotify.com/v1/artists/5a2EaR3hamoenG9rDuVn8j",
                id: "5a2EaR3hamoenG9rDuVn8j",
                name: "Prince",
                type: "artist",
                uri: "spotify:artist:5a2EaR3hamoenG9rDuVn8j"
            }
        ],
        album: {
            album_type: "album",
            artists: [
                {
                    external_urls: {
                        spotify: "https://open.spotify.com/artist/5a2EaR3hamoenG9rDuVn8j"
                    },
                    href: "https://api.spotify.com/v1/artists/5a2EaR3hamoenG9rDuVn8j",
                    id: "5a2EaR3hamoenG9rDuVn8j",
                    name: "Prince",
                    type: "artist",
                    uri: "spotify:artist:5a2EaR3hamoenG9rDuVn8j"
                }
            ],
            external_urls: {
                spotify: "https://open.spotify.com/album/2umoqwMrmjBBPeaqgYu6J9"
            },
            href: "https://api.spotify.com/v1/albums/2umoqwMrmjBBPeaqgYu6J9",
            id: "2umoqwMrmjBBPeaqgYu6J9",
            imgs: [
                {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b2738a2ce3f148f57584269c3782",
                    width: 640
                },
                {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
                    width: 300
                },
                {
                    height: 64,
                    url: "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
                    width: 64
                }
            ],
            is_playable: true,
            name: "Purple Rain",
            release_date: "1984-06-25",
            release_date_precision: "day",
            total_tracks: 9,
            type: "album",
            uri: "spotify:album:2umoqwMrmjBBPeaqgYu6J9"
        },
        youtubeId: "TvnYmWpD_T8"
    }
}










