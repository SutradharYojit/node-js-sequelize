const express = require('express');
const userModel = require('../model/customer_model')
const router = express();

// Add Users to database
router.post('/adduser', (req, res, next) => {
    console.log(req.body.email);
    try {
        userModel.User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email
        }).then(result1 => {
            userModel.ContactInfo.create({
                phone: req.body.phone,
                UserId:result1.id
            }).then(result2 => {
                return res.status(200).json({ user: result1, contact: result2, sucess: true });
            })

        });
    } catch (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Insertion failed", error: err });
    }
});


module.exports = router;