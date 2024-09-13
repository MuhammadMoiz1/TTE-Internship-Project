import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    category: String,
    field: [{ name: String, specs: String }],
});

const factoryInfoSchema = new mongoose.Schema({
    Process: String,
    Color: String,
    Code: String,
    Description: String,
    addInfo:String,
    "Item Type": String,
    image: String,
    Consumption: String
      
});

const defectsSchema = new mongoose.Schema({
    id: String,
    name: String,
    image:String,
});

const componentSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: [infoSchema],
    factoryInfo: [factoryInfoSchema],
    defects: [defectsSchema],
});

const miscellinousSchema = new mongoose.Schema({
    Process: String,
    Color: String,
    Code: String,
    Description: String,
    addInfo:String,
    "Item Type": String,
    image: String,
    Consumption: String
});

const modelSchema = new mongoose.Schema({
    modelName: String,
    factName: String,
    image: String,
    component: [componentSchema],
    miscellinous: [miscellinousSchema],
});

const Model = mongoose.model('models', modelSchema);
export default Model;
