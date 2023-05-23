var request = require("request");
const Song = require("../models/songModel");

async function getLyrics(req, res) {
  const track_id = req.params.id;
  var header = {
    url: `https://spotify-lyric-api.herokuapp.com/?trackid=${track_id}`,
    json: true,
  };
  var result = [];
  request.get(header, async function (error, response, body) {
    if (error) {
      res.json([]);
    } else {
      
      if (Object.values(body).length > 2) {
        var data = Object.values(body)[2];
        data = data.map((lyric, index) => {
          const nextLyric = data[index + 1];
          const endTimeMs = nextLyric ? nextLyric.startTimeMs : null;

          return {
            words: lyric.words,
            startTimeMs: lyric.startTimeMs,
            endTimeMs: endTimeMs,
          };
        });
        data.pop();
      }
      result = data;
    }
    if(result) {
    await Song.findOneAndUpdate(
      { track_id: track_id },
      { lyrics: result }
    )
    .catch((error) => {
      console.error(`Error updating  ${track_id}. \nError: ${error}`);
    });
    
    res.json(result);
  } else {
    res.json([])
  }
  });
}

module.exports = { getLyrics };
