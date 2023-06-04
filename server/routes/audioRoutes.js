const { getAudio, searchAudio } = require("../controllers/audioController");
const express = require("express");
const router = express.Router();

router.get(
  "/audio/:artist/:track/:duration",
  async (req, res) => await getAudio(req, res)
);
router.get(
  "/audio/search/:query",
  async (req, res) => await searchAudio(req, res)
);

module.exports = router;
