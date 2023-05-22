const { searchSong } = require("../controllers/songController");
const express = require("express");
const router = express.Router();

router.get(
  "/song/search/:query",
  async (req, res) => await searchSong(req, res)
);

module.exports = router;
