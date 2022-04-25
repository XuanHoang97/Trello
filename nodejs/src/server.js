import express from 'express';
import "dotenv/config";
import {connectDB} from './config/connectDB';
import apiRoutes from './routes/api';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

connectDB().then(() => {
    runApp();   
}).catch(err => {
    console.log(err);
});


const runApp = () => {
    app.get('/', async(req, res) =>{
        res.send('Hello World!');
    });

    apiRoutes(app); 

    // connection();

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
