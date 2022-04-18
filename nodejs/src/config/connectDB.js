import { MongoClient } from 'mongodb'
import "dotenv/config";

// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;
let db;

const connectDB = async() => {
    try{
        await client.connect();
        console.log('Connected successfully to server');
        db = client.db(dbName);
    }catch(error){
        console.log('connected error to server', error);
    }finally{
    }
}

const getDB = () => {
    return db;
}

module.exports = {connectDB, getDB};