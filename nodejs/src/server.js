import express from 'express';
import "dotenv/config";
import {connectDB, getDB} from './config/connectDB';
import {createNew} from './models/board';

const app = express();
const port = process.env.PORT || 8080;

connectDB().then(() => {
    runApp();   
}).catch(err => {
    console.log(err);
});


const runApp = () => {
    app.get('/', async(req, res) =>{
        let fake = {
            title: 'fake title',
        }
        await createNew(fake);
        res.send('Hello World!');
    });

    // connection();

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
