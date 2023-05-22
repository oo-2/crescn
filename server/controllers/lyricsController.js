var request = require("request");
const Song = require("../models/songModel");

const getLyrics = async (req, res) => {
  var header = {
    url: `https://spotify-lyric-api.herokuapp.com/?trackid=${req.params.id}`,
    json: true,
  };

  request.get(header, function (error, response, body) {
    if (error) {
      res.json({ error: "Not found" });
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
      } else {
        data = [];
      }
      res.json(data);
    }
  });
};

module.exports = { getLyrics };
