const YoutubeMusicApi = require("youtube-music-api");
const ytdl = require("ytdl-core");





const getAudio = async (req, res) => {
  const music = new YoutubeMusicApi();
  var videoId = "";
  await music.initalize();
  await music.search(req.params.query, "song").then((result) => {
    if (Object.values(result.content).length < 1) {
      res.status(404).json({ error: "Audio not found" });
    }
    var song = result.content[0];
    videoId = song.videoId;
  });

  try {
    const range = req.headers.range;
    const options = {
      format: "mp3",
      filter: "audioonly",
    };
    let info = await ytdl.getInfo(videoId);
    const meta = ytdl.chooseFormat(info.formats, options);
    let stream = ytdl(videoId, options);
    const fileSize = meta.contentLength;
    res.set("Content-Length", fileSize);
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      stream = ytdl(videoId, {
        format: "mp3",
        filter: "audioonly",
        range: {start: start, end: end}
      });
      res.set("Content-Length", chunkSize);
      res.set("Content-Range", `bytes ${start}-${end}/${fileSize}`);
    }
    res.writeHead(200, {
      "Accept-Ranges": "bytes",
      "Content-Type": "audio/mp3",
    });
    stream.pipe(res);
  } catch (err) {
    console.error("Error occurred while getting audio info:", err);
    res.status(500).send("An error occurred while getting audio info.");
  }
};

module.exports = { getAudio };
