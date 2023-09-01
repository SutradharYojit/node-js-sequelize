const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const demoroute= require('./demo')
// show that which type of data in coming from body
app.use(morgan('dev'));// 1 middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Starting");

app.get('/',demoroute );


module.exports = app;