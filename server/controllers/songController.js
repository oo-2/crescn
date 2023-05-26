var request = require("request");
require("dotenv").config();
const Song = require("../models/songModel");

const { v5: uuidv5 } = require("uuid");

const namespace = "7d6d75f5-73e9-42d0-8cfe-74b7a9c19181";

const searchSong = async (req, res) => {
  var client_id = process.env.SPOTIFY_ID;
  var client_secret = process.env.SPOTIFY_SECRET;

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
          res.status(404).json({ error: "Lyrics not found" });
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

async function getArtist(req, res) {
  const uuid = req.params.uuid;
  try {
    const song = await Song.findOne({ _id: uuid });
    if (song) {
      res.json({ artist_name: song.artist_name });
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTrack(req, res) {
  const uuid = req.params.uuid;
  try {
    const song = await Song.findOne({ _id: uuid });
    if (song) {
      res.json({ track_name: song.track_name });
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSong(req, res) {
  const uuid = req.params.uuid;
  try {
    const song = await Song.findOne({ _id: uuid });
    if (song) {
      res.json({
        artist_name: song.artist_name,
        track_name: song.track_name,
        duration: song.duration,
        lyrics: song.lyrics,
        track_id: song.track_id,
      });
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { searchSong, getArtist, getTrack, getSong };
