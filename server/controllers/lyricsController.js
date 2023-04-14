var request = require('request');
const config = require('config');




const searchSong = async (req, res) => {
  var client_id = config.get('Spotify.client_id');
  var client_secret = config.get('Spotify.client_secret');
  
  var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

  request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
      var token = body.access_token;
      var options = {
          url: `https://api.spotify.com/v1/search?q=${encodeURI(req.params.query)}&type=track`,
          headers: {
              'Authorization': 'Bearer ' + token
            },
            json: true
      };
      request.get(options, function(error, response, body) {
          console.log(error);
          var results = body.tracks.items;
          results = results.slice(0, 10);
          results = results.map( (item) => { return {track_id: item.id, track_name: item.name, artist_name: item.artists[0].name}})
          res.json(results);
      });
      }
  });
};


const getLyrics = async (req, res) => {
    res.json("https://github.com/akashrchandran/spotify-lyrics-api")
};

module.exports = {searchSong, getLyrics};