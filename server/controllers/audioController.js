const YoutubeMusicApi = require("youtube-music-api");
const ytdl = require("ytdl-core");

const getAudio = async (req, res) => {
  const music = new YoutubeMusicApi();
  var id = "";
  const options = {
    format: "mp3",
    filter: "audioonly",
  };
  await music.initalize();
  await music.search(req.params.query, "song").then((result) => {
    if (Object.values(result.content).length < 1) {
      res.status(404).json({ error: "Audio not found" });
    }
    var song = result.content[0];
    id = song.videoId;
  });

  try {
    let info = await ytdl.getInfo(id);
    const meta = ytdl.chooseFormat(info.formats);
    res.set({
      "Content-Type": "audio/mp3",
      "Content-Length": meta.contentLength,
      "Accept-Ranges": `bytes 0-${meta.contentLength}`,
    });
    const stream = ytdl(id, options).pipe(res);

    stream.on("error", (err) => {
      console.error("Error occurred during streaming:", err);
      res.status(500).send("An error occurred during streaming.");
    });
  } catch (err) {
    console.error("Error occurred while getting video info:", err);
    res.status(500).send("An error occurred while getting video info.");
  }
};

module.exports = { getAudio };
