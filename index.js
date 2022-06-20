const fs = require("fs")

const getSongs = async () => {
    const data = await fs.promises.readFile("./data.json", (err, data) => {
        console.log(data)
    })
    return JSON.parse(data)
}

const getTextOfSongs = async () => {
    const songs = await getSongs()
    const formattingSongs = songs.data.map(song => {
        return {artist: song.artist, title: song.title}
    }).map((formatted) => {
        return `${formatted.artist} - ${formatted.title}\n`
    }).reduce((acc, song) => {
        return acc + song
    }, "")
    await fs.writeFile("songs.txt", formattingSongs, "utf8", (err) => {
        if (err) {
            console.log(err)
        }
    })
}

getTextOfSongs()