const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = process.env.MONGO_DATABASE || 'cvBuilder';
const db = client.db(dbName); 

module.exports = {client,db};

