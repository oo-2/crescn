const { getAudio } = require("../controllers/audioController");
const express = require("express");
const router = express.Router();

router.get(
  "/audio/:artist/:track/:duration",
  async (req, res) => await getAudio(req, res)
);

module.exports = router;
