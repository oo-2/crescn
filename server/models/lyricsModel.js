const mongoose = require("mongoose");

const lyricSchema = new mongoose.Schema({
  track_name: { type: String, required: true },
  artist_name: { type: String, required: true },
  lyrics: [
    {
      words: { type: String },
      startTimeMs: { type: Number },
      endTimeMs: { type: Number },
    },
  ],
});

const Lyric = mongoose.model("Lyric", lyricSchema);

module.exports = Lyric;
