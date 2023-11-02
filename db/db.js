const mongoose = require('mongoose');

const url = process.env.MONGO_URI || '';

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