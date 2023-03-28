const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('Connection successfully to mongodb!!');
    } catch (error) {
        console.log(error);
    }    
})();

const db = client.db('studi-kasus-api');

module.exports = db;
