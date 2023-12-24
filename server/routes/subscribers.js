const express = require('express')
const router = express.Router()


// getting all
router.get('/',(req, res) => {
    res.send("hello world")
})

module.exports = router