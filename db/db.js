const mongoose = require('mongoose');
//const { async } = require('regenerator-runtime');

const url = process.env.MONGO_URI || '';
console.log(url);
//const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

async function connect() {   
    await mongoose.connect(url);
    console.log('Connected successfully to server');
}

async function close() {
    await client.close();
}

module.exports = {
    connect,
    close
};