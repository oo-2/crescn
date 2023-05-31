const YoutubeMusicApi = require("youtube-music-api");
const ytdl = require("ytdl-core");

const getAudio = async (req, res) => {
  const music = new YoutubeMusicApi();
  var url = "";
  await music.initalize();
  await music.search(req.params.query, "song").then((result) => {
    if (Object.values(result.content).length < 1) {
      res.status(404).json({ error: "Audio not found" });
    }
    var song = result.content[0];
    url = `http://www.youtube.com/watch?v=${song.videoId}`;
  });

  try {
    let info = await ytdl.getInfo(url);
    const meta = ytdl.chooseFormat(info.formats, {
      format: "mp3",
      filter: "audioonly",
    });
    
    const range = req.headers.range;
    const fileSize = meta.contentLength;
    
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0]);
      const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
    
      const chunkSize = end - start + 1;
      const stream = ytdl(url, {
        format: "mp3",
        filter: "audioonly",
      
      });
    
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/mp3",
      });
    
      stream.pipe(res);
    } else {
      res.set({
        "Content-Type": "audio/mp3",
        "Content-Length": fileSize,
        "Accept-Ranges": "bytes",
      });
    
      const stream = ytdl(url, {
        format: "mp3",
        filter: "audioonly",
      });
    
      stream.pipe(res);
    }
  } catch (err) {
    console.error("Error occurred while getting video info:", err);
    res.status(500).send("An error occurred while getting video info.");
  }
};

module.exports = { getAudio };
