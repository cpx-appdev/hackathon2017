"use strict";

import * as express from "express";

export const api = express.Router();

import * as apiHomeController from "../controllers/api/index";
import * as navpointsController from "../controllers/api/navpoints";
import * as positionController from "../controllers/api/position";


api.get("/", apiHomeController.getApi);
api.get("/navpoints", navpointsController.getList);
api.get("/navpoints/:name", navpointsController.get);
api.put("/navpoints", navpointsController.create);
api.post("/navpoints", navpointsController.create);
api.post("/navpoints/:name", navpointsController.replace);
api.post("/navpoints/:name", navpointsController.update);
api.delete("/navpoints/:name", navpointsController.remove);
api.get("/position/whereami", positionController.whereami);

