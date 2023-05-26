var request = require("request");
const Song = require("../models/songModel");
require("dotenv").config();
async function getLyrics(req, res) {
  var authOptions = {
    url: `https://open.spotify.com/`,
    headers: {
      "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36`,
      "App-platform": `WebPlayer`,
      "Content-type": `text/html; charset=utf-8`,
      origin: "https://open.spotify.com",
      referer: "https://open.spotify.com/",
      Cookie: `sp_dc=${process.env.SPOTIFY_DC};`,
    },
    json: true,
  };
  token = request.get(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const regex = /{"accessToken":"([^"]+)"/;
      var token = body.match(regex)[1];
      authOptions.headers["Authorization"] = `Bearer ${token}`;
      authOptions.url = `https://spclient.wg.spotify.com/color-lyrics/v2/track/${req.params.id}`;
      request.get(authOptions, async function (error, response, body) {
        if (body) {
          var data = Object.values(body)[0]["lines"];
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
          await Song.findOneAndUpdate(
            { track_id: req.params.id },
            { lyrics: data }
          ).catch((error) => {
            console.error(
              `Error updating  ${req.params.id}. \nError: ${error}`
            );
          });
          res.json(data);
        } else {
          res.json([]);
        }
      });
    } else {
      res.json([]);
    }
  });
}

module.exports = { getLyrics };
