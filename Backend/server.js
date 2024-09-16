import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import adminRoute from './Routers/adminRoute.js';
import userRoute from './Routers/userRoute.js';
import combinedGroupRoutes from './Routers/combineGroup.js'
import groupByScannedRoutes from "./Routers/groupbysacnned.js";
import fileUploadRoutes from './Routers/databaseWrite.js'
import dotenv from 'dotenv';
import cluster from "cluster";
if (cluster.isMaster) {
  // Determine the number of CPU cores
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers based on the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}
else{

dotenv.config();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use("/combinedGroup", combinedGroupRoutes);
app.use("/groupByScanned", groupByScannedRoutes);
app.use("/fileupload", fileUploadRoutes);
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
}
