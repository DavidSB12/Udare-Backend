const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect(  process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000)).then(() => console.log("Connected to database and listening on port: "+3000));

app.get("/", (req, res) => {
    res.send("Hello world");
})