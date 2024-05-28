const mongoose = require('mongoose');

class Database {
    constructor() {
        if (!Database.instance) {
            this.url = process.env.MONGO_URI || '';
            this.connection = null;
            Database.instance = this;           
        }

        return Database.instance;
    }

    async connect() {
        if (!this.connection) {
            this.connection = await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected successfully to server');
        }
        return this.connection;
    }

    async close() {
        if (this.connection) {
            await mongoose.connection.close();
            this.connection = null;
            console.log('Connection closed');
        }
    }
}

module.exports = Database;

