const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  track_name: { type: String, required: true },
  track_id: { type: String, required: false },
  artist_name: { type: String, required: true },
  duration: { type: Number, required: true },
  other_artist: [
    {
      name: { type: String, required: false },
    },
  ],
  lyrics: [
    {
      words: { type: String },
      startTimeMs: { type: Number },
      endTimeMs: { type: Number },
    },
  ],
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
