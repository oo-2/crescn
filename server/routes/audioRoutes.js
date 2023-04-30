const { getAudio } = require('../controllers/audioController')
const express = require('express');
const router = express.Router()

router.get('/audio/:query', async(req, res) => await getAudio(req, res))


module.exports = router