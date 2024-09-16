import mongoose from "mongoose";
const { Schema } = mongoose;

const fileSchema = new Schema({
  filename: { type: String, required: true },
  fileId: { type: Schema.Types.ObjectId, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FileMetadata", fileSchema);
