const express = require('express');
const router = express();
const tweet = require('../model/sq_data_model').Tweet;

router.post('/createTweet', async(req, res, next) => {
    const data = req.body;
    await tweet.create({ title: data.title, description: data.description, UserId: data.userId })
        .then((result) => {
            return res.status(201).json({ status: true, message: "Tweet add Succesfully", data: result });
        }).catch((error) => {
            return res.status(404).json({ status: false, message: "Failed", data: error.message });
        });

});


module.exports = router;