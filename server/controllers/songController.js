var request = require("request");
const config = require("config");
const Song = require("../models/songModel");

const { v5: uuidv5 } = require("uuid");

const namespace = "7d6d75f5-73e9-42d0-8cfe-74b7a9c19181";

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
          results = results.slice(0, 15);
          const uniqueSongs = new Map();

          results.forEach((item) => {
            const key = `${item.artists[0].name}-${item.name}`;
            const data = `${item.artists.map((a) => a.name).join("")}${
              item.name
            }${item.duration_ms}}`;
            const uuid = uuidv5(data, namespace);
            Song.updateOne(
              { _id: uuid },
              {
                $set: {
                  track_name: item.name,
                  track_id: item.id,
                  artist_name: item.artists[0].name,
                  duration: item.duration_ms,
                  other_artist: item.artists
                    .slice(1)
                    .map((a) => ({ name: a.name })),
                },
              },
              { upsert: true }
            ).catch((error) => {
              console.error("Error while processing song: ", error);
            });

            if (
              !uniqueSongs.has(key) ||
              item.popularity < uniqueSongs.get(key).popularity
            ) {
              uniqueSongs.set(key, {
                track_id: item.id,
                _id: uuid,
                track_name: item.name,
                artist_name: item.artists[0].name,
                other_artists: item.artists
                  .slice(1)
                  .map((a) => ({ name: a.name })),
                duration: item.duration_ms,
                popularity: item.popularity,
              });
            }
          });

          res.json(Array.from(uniqueSongs.values()));
        }
      });
    }
  });
};


module.exports = { searchSong };
