
import { storageService } from '../async-storage.service.js'
import { makeId, saveToStorage } from '../util.service.js'
import { userService } from '../user'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg
}
window.cs = stationService

const stations =
    [
        {
            _id: '5cksxjas89xjsa8xjsa8jxs09',
            name: 'Funky Monks',
            tags: ['Funk', 'Happy'],
            createdBy: {
                _id: 'u101',
                fullname: 'Puki Ben David',
                imgUrl: `https://robohash.org/Funky?set=set1`,
            },
            likedByUsers: ['{Johny}', '{Walker}'],
            songs: [
                {
                    id: 's1001',
                    title: 'The Meters - Cissy Strut',
                    url: 'youtube/song.mp4',
                    imgUrl: '`https://robohash.org/meters?set=set1`',
                    addedBy: '{minimal-user}',
                    likedBy: ['{minimal-user}'],
                    addedAt: 162521765262,
                },
                {
                    id: 'mUkfiLjooxs',
                    title: "The JB's - Pass The Peas",
                    url: 'youtube/song.mp4',
                    imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
                    addedBy: {},
                },
            ]
        },
        {
            _id: '5cksxjas89xjsa8xjsa8jxs08',
            name: '90s  party',
            tags: ['Hip-Hop', 'Happy'],
            createdBy: {
                _id: 'u102',
                fullname: 'Muki Ja',
                imgUrl: 'http://some-photo/',
            },
            likedByUsers: ['{Addam}', '{Alex}'],
            songs: [
                {
                    id: 's1002',
                    title: 'The Rooling stones - Paint it black',
                    url: 'youtube/song.mp4',
                    imgUrl: '`https://robohash.org/black?set=set1`',
                    addedBy: '{Tommy}',
                    likedBy: ['{David}'],
                    addedAt: 162521765262,
                },
                {
                    id: 'mUkfiLjooxs',
                    title: "Prince-Kiss",
                    url: 'youtube/song.mp4',
                    imgUrl: '`https://robohash.org/Kiss?set=set1`',
                    addedBy: '{Michael}',
                    addedAt: 162521765001,
                },
            ]
        },
    ]

_createStations()

function _createStations() {
    saveToStorage(STORAGE_KEY, stations)
}

async function query(filterBy = { txt: '' }) {
    var stations = await storageService.query(STORAGE_KEY)
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
    if (station._id) {
        const stationToSave = {
            _id: station._id,
            price: station.price,
            speed: station.speed,
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        const stationToSave = {
            vendor: station.vendor,
            price: station.price,
            speed: station.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
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








