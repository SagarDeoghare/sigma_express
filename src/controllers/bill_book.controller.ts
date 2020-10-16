import { Request, Response } from "express";
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
import { IBillBook, BillBookModel } from '../models/billBook';
import { HttpException } from '../error/httpExceptions';

export class BillBookController implements IController{
  private path: string = "/bill_book";
  private router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes()
  }

  setRouter() {
    this.router.post(this.path, this.createBillBook);
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createBillBook(req: Request, res: Response, next: express.NextFunction) {
    let item: IBillBook = req.body;
    if (item.name && item.total ) {
      item = await BillBookModel.createBillItem(item);
      res.send(item);
    } else {
      next(new HttpException(400, 'Unable to create data'));
    }
  }
}