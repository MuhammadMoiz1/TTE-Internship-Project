import express from "express";
import multer from "multer";
const routes = express.Router();

// Define storage with a custom filename function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Use the original filename or add logic to rename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


import { databaseWrite,getFilesDetails,deleteRecords } from "../Controllers/databaseWrite.js";

routes.post("/", upload.single("file"), databaseWrite);
routes.get("/fileData", getFilesDetails);
routes.delete("/fileDelete", deleteRecords);

export default routes;
