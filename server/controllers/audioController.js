const YoutubeMusicApi = require("youtube-music-api");
const stringSimilarity = require("string-similarity");
const ytdl = require("ytdl-core");

const getAudio = async (req, res) => {
  const music = new YoutubeMusicApi();
  var id = "";
  const options = {
    format: "mp3",
    filter: "audioonly",
  };

  await music.initalize();
  await music
    .search(`${req.params.artist} ${req.params.track}`, "song")
    .then((result) => {
      if (Object.values(result.content).length < 1) {
        res.status(404).json({ error: "Audio not found" });
      } else {
        var songs = result.content;

        let bestMatch = songs[0];
        let bestMatchScore = 0;
        songs.forEach((song) => {
          let matchScore = 0;
          let songArtist = "";
          if (song.artist.length) {
            songArtist = song.artist[0].name;
          } else {
            songArtist = song.artist.name;
          }
          if (
            songArtist &&
            songArtist.toLowerCase() === req.params.artist.toLowerCase()
          ) {
            matchScore += 3;
          }

          let durationDifference = Math.abs(
            song.duration - req.params.duration
          );
          matchScore += 1 / (durationDifference + 1);

          if (song.name.toLowerCase() === req.params.track.toLowerCase()) {
            matchScore += 2;
          }

          let titleSimilarity = stringSimilarity.compareTwoStrings(
            req.params.track.toLowerCase(),
            song.name.toLowerCase()
          );
          matchScore += titleSimilarity;

          if (matchScore > bestMatchScore) {
            bestMatch = song;
            bestMatchScore = matchScore;
          }
        });

        id = bestMatch.videoId;
      }
    });
  try {
    let info = await ytdl.getInfo(id);
    const meta = ytdl.chooseFormat(info.formats, options);
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
