"use strict";

import * as async from "async";
import * as request from "request";
import * as httpStatus from "http-status";
import { default as NavPoint, NavPointModel, Beacon } from "../../models/NavPoint";
import { Response, Request, NextFunction } from "express";

export let whereami = (req: Request, res: Response) => {
  NavPoint.find().where().then(
    s => {
  res.status(httpStatus.OK);
  res.json(s);
    });
  res.end();
};