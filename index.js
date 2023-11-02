const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const routes = require('./routes/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');

// connect to database
connect()

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use('/', routes);
app.get("/test", (req, res) => {
    res.send("Hello World");
    res.sendStatus(200);
});


// start server
app.listen(port, () => console.log(`Listening on port ${port}`));
