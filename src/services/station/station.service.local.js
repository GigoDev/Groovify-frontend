
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


async function query(filterBy = { txt: ''}) {
    var stations = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

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

const stationNames = [
    "Summer Vibes", "Chill Hits", "Workout Boost", "Throwback Jams", "Party Anthems", "Acoustic Relaxation", "Road Trip Tunes", "Morning Motivation", "Evening Unwind", "Dance Floor Fillers",
    "Rock Legends", "Pop Perfection", "Jazz Essentials", "Classical Calm", "Hip-Hop Hype", "Indie Inspiration", "R&B Grooves", "Reggae Rhythms", "Blues Classics", "Country Roads",
    "EDM Energy", "Latin Beats", "Soulful Sundays", "Piano Moods", "Folk Favorites", "Metal Madness", "Ambient Atmosphere", "Funk Fever", "Gospel Greats", "Alternative Anthems",
    "Lofi Lounge", "Electro Chill", "World Music Wonders", "Holiday Hits", "Romantic Ballads", "Festival Favorites", "Synthwave Dreams", "Guitar Heroes", "Opera Highlights", "Epic Soundtracks"
]

const musicGenres = [
    "Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Indie", "R&B", "Reggae", "Blues", "Country",
    "EDM", "Latin", "Soul", "Folk", "Metal"
]

const usernames = [
    "StarGazer", "NightOwl", "HappyCamper", "TechieGuru", "MountainMover", "DreamWeaver", "OceanExplorer", "SkyWalker", "WildHeart", "SunChaser",
    "UrbanNomad", "ForestWhisperer", "CyberPunk", "BlazeRunner", "PixelPainter", "CodeCrafter", "QuantumLeap", "EchoWhisper", "MysticTraveler", "GalacticRider",
    "PhoenixFire", "AquaMarine", "ShadowHunter", "NeonNinja", "ZenMaster", "RogueWarrior", "SilentStorm", "LunarLover", "VoyageSeeker", "WindRider",
    "SolsticeSeeker", "ThunderStrike", "CrystalMage", "AstralPilot", "MysticMuse", "NebulaNavigator", "DesertRover", "CosmicDreamer", "InfinityWalker", "AuroraDancer"
]

const songTitles = [
    "Dancing in the Moonlight", "Whispers in the Wind", "Sunset Boulevard", "Electric Dreams", "Ocean Waves", "Starlight Serenade", "Neon Nights", "Echoes of Love", "Mystic Journey", "Endless Summer",
    "Silver Lining", "Midnight Run", "Golden Horizon", "Crimson Skies", "Velvet Rain", "City Lights", "Shadow Play", "Heartbeats", "Desert Mirage", "Aurora Borealis",
    "Whispering Pines", "Crystal Clear", "Wildflower", "Eternal Flame", "Morning Dew", "Twilight Glow", "Celestial Voyage", "Silent Echoes", "Timeless Melody", "Lunar Eclipse",
    "Radiant Dawn", "Mystic River", "Paradise Lost", "Chasing Dreams", "Harmonic Bliss", "Echo Chamber", "Galactic Tide", "Enchanted Forest", "Ephemeral Beauty", "Solstice Serenade"
]

_createStations()

function _createStations() {
    const stations = []
    for (let i = 0; i < 40; i++) {
        stations.push(_createStation(i))
    }
    saveToStorage(STORAGE_KEY, stations)
}

function _createStation(i) {
    return {
        _id: makeId(),
        name: stationNames[i],
        tags: ['Funk', 'Happy'],
        createdBy: {
            _id: makeId(),
            fullname: usernames[i],
        },
    }
}







