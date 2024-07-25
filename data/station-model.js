const station = {
    _id: makeId(),
    type: "artist", //all
    spotifyId: "5a2EaR3hamoenG9rDuVn8j", //all
    name: "Prince", //all
    listeners: 7358369, //artist
    description: null, // playlist
    likes: null, // playlist
    owner: null, //all
    total: null, //playlist , album
    releaseDate: null, //album
    imgs: [
        {
            height: 640,
            url: "https://i.scdn.co/image/ab6761610000e5ebeaca358712b3fe4ed9814640",
            width: 640
        },
        {
            height: 320,
            url: "https://i.scdn.co/image/ab67616100005174eaca358712b3fe4ed9814640",
            width: 320
        },
        {
            height: 160,
            url: "https://i.scdn.co/image/ab6761610000f178eaca358712b3fe4ed9814640",
            width: 160
        }
    ], //all
    tracks: [
        {
            spotifyId: "62LJFaYihsdVrrkgUOJC05", //all
            addedAt: null, //playlist
            name: "Kiss", //all
            duration: "3:46", //all
            artist: {
                spotifyId: "5a2EaR3hamoenG9rDuVn8j",
                name: "Prince"
            },
            album: {
                spotifyId: "54DjkEN3wdCQgfCTZ9WjdB",
                name: "Parade - Music from the Motion Picture Under the Cherry Moon",
                imgs: [
                    {
                        url: "https://i.scdn.co/image/ab67616d0000b27323cc0f0a925845a3de4aca38",
                    }
                ] // playlist , atrist
            }
        }
    ] //all
}