import express from "express";
import dotenv from "dotenv";
import Connection from './database/db.js';
import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.use('/',Routes);

const URL = process.env.MONGO_URL;

Connection(URL);

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})