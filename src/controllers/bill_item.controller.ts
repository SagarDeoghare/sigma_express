import { Request, Response } from "express";
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
import { IBillItem, BillItemModel } from '../models/billItems';
import { body, validationResult } from 'express-validator';
import { HttpException } from '../error/httpExceptions';


export class BillItemController implements IController {
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

  private validateBillItem(method: string): any[] {
    let validators: any[] = [];
    //   item_id: number,
    // name: string,
    // qty: number,
    // price: number,
    // total: number,
    // bill_id: number,
    // discount:  number | null
    switch (method) {
      case 'create':
        validators = [
          body('name').isString(),
          body('qty').isNumeric(),
          body('price').isNumeric(),
          body('total').isNumeric()
        ];

    }
    return validators;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createBillItem(req: Request, res: Response) {
    const error = validationResult(req);
    if (error.isEmpty()) {


      let item: IBillItem = req.body;
      if (item.name && item.item_id) {
        item = await BillItemModel.createBillItem(item);
        res.send(item);
      } else {
        res.send("Unprocessable Entity");
        res.status(422);
      }
    } else {
      new HttpException(404, 'Bad request');
    }
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