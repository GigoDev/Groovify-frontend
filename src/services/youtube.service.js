const YT_KEY = 'AIzaSyBSWt3 - m0mxFxo3zs2yYCRSomPyGt1kRKI'


function getVideo(search) {

    const videos = loadFromStorage(search)

    if (videos) {   // Load from cache
        console.log('load from cache')
        return Promise.resolve(videos)
    }

    if (!search) return  Promise.resolve(_createDemoVideos()) // Demo data


    const url = _getUrl(search)

    return axios.get(url) // AJAX req
        .then(res => {
            console.log('load from AJAX')
            let videos = _createVideos(res.data.items)
            saveToStorage(search, videos)
            return videos
        })
        .catch(err => {
            console.log('err:', err)
        })
}

function _createVideos(items) {
      return items.map(item => _createVideo(item))
}

function _createVideo(item) {
    const id = item.id.videoId
    const title = item.snippet.title
    const imgUrl = item.snippet.thumbnails.default.url
    return { id, title, imgUrl }
}

function _getUrl(search) {
    return `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `videoEmbeddable=true&` +
        `type=video&` +
        `key=${YT_KEY}&q=${search}`

}


function _createDemoVideos() {
    return [
        {
            "id": "l9ZhYl11TpM",
            "title": "The Beatles Greatest Hits Full Album - Best Beatles Songs Collection",
            "imgUrl": "https://i.ytimg.com/vi/l9ZhYl11TpM/default.jpg"
        },
        {
            "id": "FusIKjztap8",
            "title": "The Beatles - Here, There and Everywhere",
            "imgUrl": "https://i.ytimg.com/vi/FusIKjztap8/default.jpg"
        },
        {
            "id": "NCtzkaL2t_Y",
            "title": "The Beatles - Don&#39;t Let Me Down",
            "imgUrl": "https://i.ytimg.com/vi/NCtzkaL2t_Y/default.jpg"
        },
        {
            "id": "A_MjCqQoLLA",
            "title": "The Beatles - Hey Jude",
            "imgUrl": "https://i.ytimg.com/vi/A_MjCqQoLLA/default.jpg"
        },
        {
            "id": "2Q_ZzBGPdqE",
            "title": "The Beatles - Help!",
            "imgUrl": "https://i.ytimg.com/vi/2Q_ZzBGPdqE/default.jpg"
        }
    ]
}

