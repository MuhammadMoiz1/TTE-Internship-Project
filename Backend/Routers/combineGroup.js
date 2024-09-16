import express from "express";
const routes = express.Router();
import combineGroup from "../Controllers/combineGroup.js";

routes.post("/", combineGroup);
export default routes;
