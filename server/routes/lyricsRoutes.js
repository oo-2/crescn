const { searchSong, getLyrics } = require('../controllers/lyricsController')
const express = require('express');
const router = express.Router()

router.get('/lyrics/search/:query', async(req, res) => await searchSong(req, res))
router.get('/lyrics/:id', async(req, res) => await getLyrics(req, res))

module.exports = router