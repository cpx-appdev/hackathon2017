"use strict";

import * as express from "express";

export const api = express.Router();

import * as apiHomeController from "../controllers/api/index";
import * as navpointsController from "../controllers/api/v1/navpoints";

api.get("/", apiHomeController.getApi);
api.get("/v1/navpoints", navpointsController.getList);
api.get("/v1/navpoints/:name", navpointsController.get);
api.post("/v1/navpoints/create", navpointsController.create);
