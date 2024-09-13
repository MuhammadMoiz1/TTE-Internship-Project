import express from "express";
import Model from "../Models/model.js";
import Defect from "../Models/defect.js";

const router=express.Router();

router.get('/models',async(req,res)=>{
    try {
        const models=await Model.find({},'modelName factName image');
        return res.status(200).json(models);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

router.get('/models/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const model= await Model.findById(id);
        return res.status(200).json(model);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
})


router.get('/defects',async(req,res)=>{
    try {
        const defects=await Defect.find({},'name image quantity');
        return res.status(200).json(defects);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

router.get('/defects/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const defect= await Defect.findById(id);
        return res.status(200).json(defect);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
})
export default router;