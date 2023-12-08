import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from './mongoDB/connect.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.status(200).json({
      message: 'Welcome to Yariga!',
    });
});


const startServer = async () => {
    try {
      connectDB(process.env.MONGO_URL as string);
      app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();