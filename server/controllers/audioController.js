const YoutubeMusicApi = require("youtube-music-api");
const ytdl = require("ytdl-core");

const getAudio = async (req, res) => {
  const music = new YoutubeMusicApi();
  var url = "";
  await music.initalize();
  await music.search(req.params.query, "song").then((result) => {
    if (Object.values(result.content).length < 1) {
      res.json({ error: "Not found" });
    }
    var song = result.content[0];
    url = `http://www.youtube.com/watch?v=${song.videoId}`;
   
  });

  let info = await ytdl.getInfo(url);
  const meta = await ytdl.chooseFormat(info.formats, {
    format: "mp3",
    filter: "audioonly",
  });
  res.set({
    "Content-Type": "audio/mp3",
    "Content-Length": meta.contentLength,
    "Accept-Ranges": `bytes 0-${meta.contentLength}`,
  });
  const stream = ytdl(url, {
    format: "mp3",
    filter: "audioonly",
  }).pipe(res);

  stream.on("data", (chunk) => {
    console.log("Received audio chunk:", chunk);
  });
};

module.exports = { getAudio };
