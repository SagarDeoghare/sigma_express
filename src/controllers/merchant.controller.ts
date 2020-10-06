import { Request, Response } from "express";
import { IMerchant, MerchantModel } from '../models/merchant';
import { body } from 'express-validator';
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
export class MerchantController implements IController{
  private path: string = "/merchant";
  private router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes()
  }

  setRouter() {
    this.router.post(this.path, this.validate('create'), this.createMerchant);
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createMerchant(req: Request, res: Response) {
    logger.info("create enter...");
    let data: IMerchant = req.body;
    if (data.name && data.mobile) {
      data = await MerchantModel.createUser(data);
    } else {
      res.send("Unprocessable Entity");
      res.status(422);
    }
    res.send(data);
    logger.info("create exit...");
  }

  public validate(method: string) {
    let validateResult: any = [];
    switch (method) {
      
    }
    return validateResult;
  }
}