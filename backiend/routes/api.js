const express = require('express');
const router = express.Router();
const Data = require('../models/Data'); // Import your Mongoose model

// Route to fetch IoT data
router.get('/data', async (req, res) => {
    try {
        // Fetch IoT data from MongoDB
        const data = await Data.find({}).limit(10); // Fetching the last 10 entries as an example

        // Send fetched IoT data as a JSON response
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get
/*router.get('/', async (req, res) => {
    res.render("blood pressure is 78 degrees and  heart rate is norma with 70BPM")

});/*
//post
router.post('/', async (req, res) => {
    res.send(" health  your batter choice monitoring system...");
});

//get by id
router.get('/:id', async (req, res) => {
    res.send(" health  your batter choice monitoring system...  by id");
});

//
router.patch('/:id', async (req, res) => {
    res.send("updating health  your batter choice");
});

router.delete('/:id', async (req, res) => {
    res.send(" deleting health  your batter choice monitoring system...");
});
*/

router.route('/data')
.post(function (req, res) {
    const data = new Data()
    data.sensorName = req.body.sensorName
    data.value = req.body.value

data.save()
})



// Other routes (e.g., for CRUD operations) can be defined similarly

module.exports = router;
