import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoute from './Routers/adminRoute.js';
import userRoute from './Routers/userRoute.js';
import dotenv from 'dotenv';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', userRoute);
app.use('/admin', adminRoute);
mongoose.connect(process.env.mongodbURL)
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
