import express from "express";
const routes = express.Router();
import GroupByScanned from "../Controllers/groupbyscanned.js";

routes.get("/", GroupByScanned);

export default routes;
