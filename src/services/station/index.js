const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'


function getEmptyPlaylist() {
   
    return ({
        type: 'playlist', //all
        spotifyId: null, //all
        name: 'New playlist', //all
        listeners: null, //artist
        description: 'Description', // playlist
        likes: null, // playlist
        owner: true, //all
        total: null, //playlist , album
        releaseDate: null, //album
        imgs: [{ url: '' }, { url: '' }, { url: '' }], //all
        tracks: [],//all
        createdAt: Date.now()
    })
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stationService = { getEmptyPlaylist, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stationService = stationService
