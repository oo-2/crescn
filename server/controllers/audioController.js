const YoutubeMusicApi = require('youtube-music-api');
const ytdl = require('ytdl-core');


const getAudio = async (req, res) => {
    const music = new YoutubeMusicApi();
    var url = '';
    await music.initalize();
    await music.search(req.params.query, "song").then(result => {
        if(Object.values(result.content).length < 1) {
            res.json({ error: 'Not found' })
        }
        var song = result.content[0]
        // check for best match in results i.e. check which has year, artist, and title if not 
        url = `http://www.youtube.com/watch?v=${song.videoId}`
        // console.log(song);
        })

    const stream = ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
    }).pipe(res);

    stream.on('data', (chunk) => {
        console.log('Received audio chunk:', chunk);
      });  

};

module.exports = {getAudio};