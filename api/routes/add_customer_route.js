const express = require('express');
const customerModel = require('../model/customer_model')

const router = express();

router.get('/', (req, res, next) => {
    try {
        const result = customerModel.create({ name: req.body.name, email: req.body.email }).then(result => {
            res.status(200).json({ message: result });
        });
        // res.status(200).json({ message: result });
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ message: "Insertion failed", error: err });
    }
});

module.exports = router;