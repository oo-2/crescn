const { searchSong, getArtist, getTrack, getSong } = require("../controllers/songController");
const express = require("express");
const router = express.Router();

router.get(
  "/song/search/:query",
  async (req, res) => await searchSong(req, res)
);

router.get(
  "/song/artist/:uuid",
  async (req, res) => await getArtist(req, res)
);

router.get(
  "/song/track/:uuid",
  async (req, res) => await getTrack(req, res)
);

router.get(
  "/song/:uuid",
  async (req, res) => await getSong(req, res)
);

module.exports = router;
