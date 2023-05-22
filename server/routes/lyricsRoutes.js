const { getLyrics } = require("../controllers/lyricsController");
const express = require("express");
const router = express.Router();

router.get("/lyrics/:id", async (req, res) => await getLyrics(req, res));

module.exports = router;
