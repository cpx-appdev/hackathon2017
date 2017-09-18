"use strict";

import * as async from "async";
import * as request from "request";
import * as httpStatus from "http-status";
import { default as NavPoint, NavPointModel, Beacon } from "../../models/NavPoint";
import { Response, Request, NextFunction } from "express";
import { convertFrom } from "../../converter/NavPointConverter";


export let getList = (req: Request, res: Response) => {
  NavPoint.find().then(
    s => {
  res.status(httpStatus.OK);
  res.json(s);
    });
};

export let get = (req: Request, res: Response) => {
  NavPoint.findOne({ name: req.param("name") }).then(
    s => {
  res.status(httpStatus.OK);
  res.json(s);
    });
  res.end();
};

export let create = (req: Request, res: Response) => {
  convertFrom(req.body).save()
  .catch(r => {
      res.statusMessage = r;
      res.status(httpStatus.BAD_REQUEST);
      res.end();
    }
  )
  .then(
    r => {
      res.status(httpStatus.CREATED);
      res.json(r);
    }
  );
};

export let replace = (req: Request, res: Response) => {
  const navpoint = new NavPoint(req.body).save();
  res.status(httpStatus.OK);
  res.json(navpoint);
};

export let update = (req: Request, res: Response) => {
  const navpoint = new NavPoint(req.body).save();
  res.status(httpStatus.OK);
  res.json(navpoint);
};

export let remove = (req: Request, res: Response) => {
  NavPoint.remove({ name: req.param("name") });
  res.status(httpStatus.NO_CONTENT);
};

