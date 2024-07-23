const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'


function getEmptyPlaylist(){
    return {
        //id from storage service
        type: 'playlist',
        name: 'New playlist',
        description: 'Description',
        likes:'',
        imgs: [{url:''},{url:''},{url:''}],
        tracks:[],
        total:'',
        createdBy: {},
        createdAt: Date.now()
    }
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
