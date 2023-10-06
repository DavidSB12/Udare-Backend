const {MongoClient} = require('mongodb');
const { async } = require('regenerator-runtime');

const url = process.env.MONGO_URI || '';
console.log(url);
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

const dbName = 'test';


async function connect() {
    // console.log()
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db;
}

async function close() {
    await client.close();
}

module.exports = {
    connect,
    close
};