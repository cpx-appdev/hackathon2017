"use strict";

import * as async from "async";
import * as request from "request";
import * as httpStatus from "http-status";
import { default as NavPoint, NavPointModel, Beacon } from "../../../models/NavPoint";
import { Response, Request, NextFunction } from "express";


export let getList = (req: Request, res: Response) => {
  const users = NavPoint.collection.find(req.query).toArray();
  res.status(httpStatus.OK);
  res.json(users);
};
