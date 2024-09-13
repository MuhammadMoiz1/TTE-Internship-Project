import express from "express";
import Model from "../Models/model.js";
import multer from "multer";
import Defect from '../Models/defect.js';
import Admin from '../Models/admin.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const verifyToken =(req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const upload = multer({ storage: storage });

router.post('/upload',verifyToken,upload.single('image'),async (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.send({ imageUrl });
});

router.post('/addModel', verifyToken, async (req, res) => {
  try {
    const { _id, modelName, factName, image, component, miscellinous } = req.body;

    if (!modelName || !factName || !image || !component) {
      return res.status(400).send({
        message: 'Please fill out all the fields',
      });
    }

    let model;

    if (_id) {
  
      model = await Model.findById(_id);
      if (model) {
  
        model.modelName = modelName;
        model.factName = factName;
        model.image = image;
        model.component = component;
        model.miscellinous = miscellinous;
      } else {
        return res.status(404).send({ message: 'Model not found' });
      }
    } else {

      model = new Model({
        modelName,
        factName,
        image,
        component,
        miscellinous
      });
    }
    await model.save();

    return res.status(201).send(model);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

router.delete('/deleteModel/:id', verifyToken,async (req, res) => {
  try {
    const modelId = req.params.id;

    if (!modelId) {
      return res.status(400).send({ message: 'Model ID is required' });
    }

    const deletedModel = await Model.findByIdAndDelete(modelId);

    if (!deletedModel) {
      return res.status(404).send({ message: 'Model not found' });
    }

    return res.status(200).send({ message: 'Model deleted successfully', deletedModel });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

router.post('/addDefect',verifyToken, async (req, res) => {
  try {
    const { _id, name, image, causes, quantity,description} = req.body;
    if (!name) {
      return res.status(400).send({
        message: 'Please fill out all the fields',
      });
    }
    let defect;
    if (_id) {
      defect = await Defect.findById(_id);
      if (!defect) {
        return res.status(404).send({ message: 'Defect not found' });
      }
      defect.name = name;
      defect.image = image;
      defect.causes = causes;
      defect.quantity = quantity;
      defect.description=  description;
      
    } else {
      defect = new Defect({
        name,
        image,
        causes,
        quantity,
        description
      });
    }
    const savedDefect = await defect.save();
    return res.status(201).send(savedDefect);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete('/deleteDefects/:id',verifyToken ,async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Defect.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: 'Defect not found' });
    }

    return res.status(200).send({ message: 'Defect deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.find({username});
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});


export default router;