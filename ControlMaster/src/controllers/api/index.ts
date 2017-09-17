"use strict";

import * as async from "async";
import * as request from "request";
import { Response, Request, NextFunction } from "express";


/**
 * GET /api/v1
 * List of version 1 apis.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/v1/index", {
    title: "Manage navigation points"
  });
};
