const { searchSong, getLyrics } = require("../controllers/lyricsController");
const express = require("express");
const router = express.Router();

router.get(
  "/lyrics/:artist/:title/:id",
  async (req, res) => await getLyrics(req, res)
);
router.get(
  "/lyrics/search/:query",
  async (req, res) => await searchSong(req, res)
);

module.exports = router;
