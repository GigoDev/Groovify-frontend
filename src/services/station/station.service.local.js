import { storageService } from '../async-storage.service.js'
import { spotifyService } from "../spotify.service.js";
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
    getDefualtStation,
    setPrevNextTrack
}
// window.cs = stationService

async function query() {
    let stations = await storageService.query(STORAGE_KEY)
    if (!stations || stations.length === 0) {
        saveToStorage(STORAGE_KEY, dataStations)
        console.log(stations)
        stations = dataStations.slice()
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

function getDefualtStation() {
    return {
      "_id": {
        "$oid": "66a7304e661319abe097f45d"
      },
      "type": "artist",
      "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
      "name": "Prince",
      "listeners": 7361169,
      "description": null,
      "likes": null,
      "owner": null,
      "total": null,
      "releaseDate": null,
      "imgs": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab6761610000e5ebeaca358712b3fe4ed9814640",
          "width": 640
        },
        {
          "height": 320,
          "url": "https://i.scdn.co/image/ab67616100005174eaca358712b3fe4ed9814640",
          "width": 320
        },
        {
          "height": 160,
          "url": "https://i.scdn.co/image/ab6761610000f178eaca358712b3fe4ed9814640",
          "width": 160
        }
      ],
      "tracks": [
        {
          "spotifyId": "62LJFaYihsdVrrkgUOJC05",
          "youtubeId": "H9tEvfIsDyo",
          "addedAt": null,
          "name": "Kiss",
          "duration": "3:46",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "54DjkEN3wdCQgfCTZ9WjdB",
            "name": "Parade - Music from the Motion Picture Under the Cherry Moon",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27323cc0f0a925845a3de4aca38",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0223cc0f0a925845a3de4aca38",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485123cc0f0a925845a3de4aca38",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "1uvyZBs4IZYRebHIB1747m",
          "addedAt": null,
          "name": "Purple Rain",
          "duration": "8:41",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "2umoqwMrmjBBPeaqgYu6J9",
            "name": "Purple Rain",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2738a2ce3f148f57584269c3782",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "6sby78fghipoXHQLeeZFFH",
          "addedAt": null,
          "name": "When Doves Cry",
          "duration": "5:54",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "2umoqwMrmjBBPeaqgYu6J9",
            "name": "Purple Rain",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2738a2ce3f148f57584269c3782",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "5jSz894ljfWE0IcHBSM39i",
          "addedAt": null,
          "name": "Raspberry Beret",
          "duration": "3:35",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "5FbrTPPlaNSOsChhKUZxcu",
            "name": "Around the World in a Day",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273214f0bd9dc1ed0c65ae81760",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02214f0bd9dc1ed0c65ae81760",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851214f0bd9dc1ed0c65ae81760",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "6FMIVQPZg9cmMY8hPxAacD",
          "addedAt": null,
          "name": "Let's Go Crazy",
          "duration": "4:39",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "2umoqwMrmjBBPeaqgYu6J9",
            "name": "Purple Rain",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2738a2ce3f148f57584269c3782",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "2H7PHVdQ3mXqEHXcvclTB0",
          "addedAt": null,
          "name": "1999",
          "duration": "6:19",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "3U1ht9EdWEI9nMvaqdQI67",
            "name": "1999",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2734117e531f63855d072059d6e",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e024117e531f63855d072059d6e",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048514117e531f63855d072059d6e",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "4yrM5BVyJzy5Ed4GPO6e8j",
          "addedAt": null,
          "name": "I Wanna Be Your Lover",
          "duration": "5:47",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "6k7RVZ7bSL9ryReb8RLYRI",
            "name": "Prince",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273039b95b846d039d78a2ca6a1",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02039b95b846d039d78a2ca6a1",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851039b95b846d039d78a2ca6a1",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "3QszJeuSyyZQmD9pY1tqpo",
          "addedAt": null,
          "name": "I Would Die 4 U",
          "duration": "2:49",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "2umoqwMrmjBBPeaqgYu6J9",
            "name": "Purple Rain",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2738a2ce3f148f57584269c3782",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e028a2ce3f148f57584269c3782",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048518a2ce3f148f57584269c3782",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "4iozhXt27eMl39W5z7R8H6",
          "addedAt": null,
          "name": "Little Red Corvette",
          "duration": "4:56",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "3U1ht9EdWEI9nMvaqdQI67",
            "name": "1999",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2734117e531f63855d072059d6e",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e024117e531f63855d072059d6e",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048514117e531f63855d072059d6e",
                "width": 64
              }
            ]
          }
        },
        {
          "spotifyId": "0aPaGIX2QIMAH5SMp0VEMe",
          "addedAt": null,
          "name": "The Most Beautiful Girl In the World",
          "duration": "4:25",
          "artist": {
            "spotifyId": "5a2EaR3hamoenG9rDuVn8j",
            "name": "Prince"
          },
          "album": {
            "spotifyId": "7JdnQ7zCfqETcLgS94d3ks",
            "name": "The Gold Experience",
            "imgs": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2736a4175046856b90a9b5d67a1",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e026a4175046856b90a9b5d67a1",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048516a4175046856b90a9b5d67a1",
                "width": 64
              }
            ]
          }
        }
      ]
    }
  }









