const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const addCustomerRoute= require('./api/routes/add_customer_route');
const addUserRoute= require('./api/routes/user_route');
const tweetRoute=require('./api/routes/tweet_route');

// show that which type of data in coming from body
app.use(morgan('dev'));// 1 middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Starting");

app.use('/demo',addCustomerRoute );
app.use('/user',addUserRoute );
app.use('/tweet',tweetRoute );



module.exports = app;