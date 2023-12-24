const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber')


// all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// one
router.get('/:email', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})


async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findOne({email:req.params.email})
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router