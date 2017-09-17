"use strict";

import * as async from "async";
import * as request from "request";
import { Response, Request, NextFunction } from "express";


/**
 * GET /api
 * List of apis.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "Manage navigation points"
  });
};
