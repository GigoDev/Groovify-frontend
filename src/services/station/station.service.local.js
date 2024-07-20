import { storageService } from '../async-storage.service.js'
import { makeId, saveToStorage } from '../util.service.js'
import { userService } from '../user'
import { stations as dataStations} from '../../../data/stations.js'

//local storage keys
const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addStationMsg,
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










