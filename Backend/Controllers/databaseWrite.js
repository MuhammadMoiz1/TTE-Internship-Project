import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { parse } from 'fast-csv';
import Collection  from '../Models/Checking.js';
import FileMetaData from '../Models/FileMetaData.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reportFolderPath = path.join(__dirname, "..", "uploads");

const databaseWrite = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = path.join(reportFolderPath, req.file.filename);
    const stream = fs.createReadStream(filePath);

    // Create file metadata entry
    const fileMetadata = new FileMetaData({
      filename: req.file.filename,
      fileId: new mongoose.Types.ObjectId(),
    });
    await fileMetadata.save();

    let rows = [];

    stream
      .pipe(parse({ headers: true }))
      .on("data", (row) => {
        // Validate and convert data before pushing to rows
        if (row.Qty) {
          row.Qty = parseFloat(row.Qty); // Convert Qty to a number
          if (isNaN(row.Qty)) {
            row.Qty = 0; // Handle NaN by setting to null or a default value
          }
        }

        // Add fileId to each record
        row.fileId = fileMetadata.fileId;

        rows.push(row); // Accumulate each row from the file
      })
      .on("end", async () => {
        // Insert records into the database
        try {
          await Collection.insertMany(rows);
          return res.status(200).json({ msg: "Records successfully saved" });
        } catch (error) {
          console.error("Error saving records:", error);
          return res
            .status(500)
            .json({ msg: "Error saving data to the database", error });
        }
      })
      .on("error", (error) => {
        console.error(`Error reading CSV file (${req.file.filename}):`, error);
        return res
          .status(500)
          .json({ msg: "Error processing the file", error });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error occurred during file processing", error });
  }
};

const getFilesDetails = async (req, res) => {
  try {
    const response = await FileMetadata.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteRecords = async (req, res) => {
  try {
    // Extract fileId from request body (assuming it's sent from the client)
    const { fileId } = req.body;
    console.log(fileId);
    // Check if fileId is provided
    if (!fileId) {
      return res.status(400).json({ msg: "fileId is required" });
    }

    // Find and delete all records associated with the given fileId from Collection
    const deleteResult = await Collection.deleteMany({ fileId });

    // If no records were found and deleted, respond with an appropriate message
    if (deleteResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: "No records found associated with the provided fileId" });
    }

    // Find and delete the file metadata associated with the fileId
    const fileMetaDeleteResult = await FileMetadata.findOneAndDelete({
      fileId,
    });

    // Check if the file metadata was found and deleted
    if (!fileMetaDeleteResult) {
      return res
        .status(404)
        .json({ msg: "File metadata not found for the provided fileId" });
    }

    // Send a success response
    return res
      .status(200)
      .json({ msg: "Records and file metadata deleted successfully" });
  } catch (error) {
    console.error("Error deleting records:", error);
    return res.status(500).json({ msg: "Error deleting records", error });
  }
};

export { databaseWrite, getFilesDetails, deleteRecords };
