const express = require('express');
const customerModel = require('../model/customer_model')
const router = express();

// Add cutomer to database
router.post('/adduser', (req, res, next) => {
    console.log(req.body.email);
    try {
        customerModel.create({ name: req.body.name, email: req.body.email }).then(result => {
            return res.status(200).json({ message: result });
        });
    } catch (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Insertion failed", error: err });
    }
});

// To Get all the customers
router.get('/getAll', async (req, res, next) => {
    try {
        const result = await customerModel.findAll();
        return res.status(200).json({ count: result.length, data: result });
    } catch (err) {
        console.error("Error getting data:", err);
        return res.status(500).json({ message: "Getting data failed", error: err });
    }
});

//Get the customer data by specified table attribute
router.get('/attri', async (req, res, next) => {
    try {
        // const result = await customerModel.findAll({attributes:['name','email']});  Give the only the data of the  name and email
        const result = await customerModel.findAll({ attributes: { exclude: ['email'] } }); // Get all the data of the except the email
        return res.status(200).json({ count: result.length, data: result });
    } catch (err) {
        console.error("Error getting data:", err);
        return res.status(500).json({ message: "Getting data failed", error: err });
    }
});

// update the customer data by specified user
router.get('/update/:name', async (req, res, next) => {
    try {
        await customerModel.update({ name: req.body.name, email: req.body.email }, { where: { name: req.params.name } })
            .then(() => {
                return res.status(201).json({ message: "Data updated successfully" });
            });
    } catch (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Getting updating failed", error: err });
    }
});

// delete the customer 
router.delete('/delete/:name', async (req, res, next) => {
    console.log(req.params.name);
    try {
        await customerModel.destroy({ where: { name: req.params.name } })
            .then(() => {
                return res.status(201).json({ message: "Data Delete successfully" });
            });
    } catch (err) {
        console.error("Error Delete data:", err);
        return res.status(500).json({ message: "Getting Delete failed", error: err });
    }
});

// find specific user data in table and show that which comes first in table 
router.get('/one/:name', async (req, res, next) => {
    try {
        const result = await customerModel.findOne({ where: { name: req.params.name } });
        // const result = await customerModel.findOne({where:{email:req.params.email}});  ####DEMO.1
        // const result = await customerModel.findOne({where:{id:req.params.id}});        ####DEMO.2

        return res.status(200).json({ count: result.length, data: result });
    } catch (err) {
        console.error("Error getting data:", err);
        return res.status(500).json({ message: "Getting data failed", error: err });
    }
});

// route that give the all data user by name,email and id (with same name also)
// router.get('/:email', async (req, res, next) => {   DEMO.1
// router.get('/:id', async (req, res, next) => {      DEmo.2
router.get('/:name', async (req, res, next) => {
    try {
        const result = await customerModel.findAll({ where: { name: req.params.name } });
        // const result = await customerModel.findAll({where:{email:req.params.email}});  ####DEMO.1
        // const result = await customerModel.findAll({where:{id:req.params.id}});        ####DEMO.2

        return res.status(200).json({ count: result.length, data: result });
    } catch (err) {
        console.error("Error getting data:", err);
        return res.status(500).json({ message: "Getting data failed", error: err });
    }
});

module.exports = router;