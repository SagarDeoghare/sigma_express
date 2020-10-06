import { Request, Response } from "express";
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
import { IBillItem, BillItemModel } from '../models/billItems';

export class BillItemController implements IController{
  private path: string = "/bill_items";
  private router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes()
  }

  setRouter() {
    this.router.post(this.path, this.createBillItem);
    this.router.get(this.path, this.getBillItem)
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async getBillItem(req: Request, res: Response) {
    logger.info("create getBillItem...");
    let item: IBillItem = req.body;
    if (item.name && item.item_id) {
     // item = await BillItemModel.createBillItem(item);
    } else {
      res.send("Unprocessable Entity");
      res.status(422);
    }
    res.send(item);
    logger.info("create getBillItem exit...");
  }


}