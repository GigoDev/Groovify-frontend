import fs from 'fs'
import { FastAverageColor } from 'fast-average-color'

// import fr from 'follow-redirects'

export async function setBackgroundColor2(stationImgUrl) {
    try {

        const color = await extractColor(stationImgUrl)
        document.body.style.setProperty('--bg-color2', color)
    } catch (err) {
        console.log('Ecountered error', err)
    }
}

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

export function findNextNum(stations) {
    let nums = []
    stations.forEach(({ name }) => {
        if (name.length !== 15) return
        const subStr = name.substring(0, 14)
        if (subStr !== 'New playlist #') return
        const numChar = name.charAt(14)
        if (isNaN(numChar)) return
        const num = +numChar
        nums.push(num)
    })
    if (nums.length===0) return 1 
    return Math.max(...nums) + 1
}


export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const roundedSeconds = Math.round(remainingSeconds * 100) / 100
    const formattedSeconds = roundedSeconds === 0 ? '00' : roundedSeconds.toFixed(2).padStart(5, '0')

    return `${minutes}:${formattedSeconds.split('.')[0]}`
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

export function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}
export function formatDurationSec(sec) {
    const totalSeconds = sec;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}

export function formatDuration2(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

export function writeJsonFile(path, data) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data, null, 2)

        fs.writeFile(path, jsonData, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

export function isInternalUrl(url) {
    const internalUrlPattern = /^\/(?!\/)/
    return internalUrlPattern.test(url)
}