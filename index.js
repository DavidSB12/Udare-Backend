const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const routes = require('./routes/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer")

// connect to database
connect()

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//desde cualquier dominio podemos hacer solicitudes al backend 
app.use(cors());

// routes
app.use('/', routes);


// start server
app.listen(port, () => console.log(`Listening on port ${port}`));
