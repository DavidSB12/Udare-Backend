const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const routes = require('./routes/routes.js');

// connect to database
connect();


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', routes);
app.get("/test", (req, res) => {
    res.send("Hello World");
    res.sendStatus(200);
    });

// console.log(process.env.PORT);

// start server
app.listen(port, () => console.log(`Listening on port ${port}`));
