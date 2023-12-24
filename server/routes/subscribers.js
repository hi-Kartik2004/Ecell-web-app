const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber')


// getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router