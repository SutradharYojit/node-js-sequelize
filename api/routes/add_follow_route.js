const express = require('express');
const router = express();
const sqModel = require('../model/sq_data_model');


router.post('/followUser', async (req, res, next) => {
    const data = req.body;
    const currentUser = await sqModel.User.findOne({ where: { id: data.currentUserId } });
    const followUser = await sqModel.User.findOne({ where: { id: data.followUserId } });
    currentUser.addUser(followUser);
    return res.status(201).json({ message: "followed successfully" });
});



module.exports=router;