const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://admin:admin123@cluster.t6f2nso.mongodb.net/UDARE?retryWrites=true&w=majority"
).then(() => app.listen(3000)).then(() => console.log("Connected to database and listening on port: "+3000));

app.get("/", (req, res) => {
    res.send("Hello world");
})