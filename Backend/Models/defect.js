import mongoose from "mongoose";

const defectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  causes: {
    type: [String],
  },
});

const Defect = mongoose.model('defects', defectSchema);

export default Defect;
