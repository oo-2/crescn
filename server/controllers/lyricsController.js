var request = require("request");
const config = require("config");
const Lyric = require("../models/lyricsModel");

const searchSong = async (req, res) => {
  var client_id = config.get("Spotify.client_id");
  var client_secret = config.get("Spotify.client_secret");

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          req.params.query
        )}&type=track`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
      request.get(options, function (error, response, body) {
        if (error) {
          res.json({ error: "Not found" });
        } else {
          var results = body.tracks.items;
          results = results.slice(0, 10);
          res.json(
            results.map((item) => {
              return {
                track_id: item.id,
                track_name: item.name,
                artist_name: item.artists[0].name,
              };
            })
          );
        }
      });
    }
  });
};

const getLyrics = async (req, res) => {
  // https://github.com/akashrchandran/spotify-lyrics-api
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

        Lyric.findOne({
          track_name: req.params.title,
          artist_name: req.params.artist,
        }).then((lyric) => {
          if (!lyric) {
            const storeLyric = new Lyric({
              track_name: req.params.title,
              artist_name: req.params.artist,
              lyrics: data,
            });
            storeLyric.save();
          }
        });
      } else data = [];
      res.json(data);
    }
  });
};

module.exports = { searchSong, getLyrics };
