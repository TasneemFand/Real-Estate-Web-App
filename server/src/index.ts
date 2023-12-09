import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from './mongoDB/connect.ts';
import router from './routers';

dotenv.config();

const app = express();
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(
  cors(corsOptions)
);
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

  app.use('/', router());