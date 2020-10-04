import { Request, Response } from "express";
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
import { IItem, ItemModel } from '../models/item';

export class ItemController implements IController{
  private path: string = "/items";
  private router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes()
  }

  setRouter() {
    this.router.post(this.path, this.createItem);
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createItem(req: Request, res: Response) {
    logger.info("create item...");
    let item: IItem = req.body;
    if (item.name && item.purchase_date && item.merchant_id) {
      item = await ItemModel.createItem(item);
    } else {
      
    }
    res.send(item);
    logger.info("create item exit...");
  }
}