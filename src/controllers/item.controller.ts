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
    this.router.get(this.path + '/:id', this.getItem)
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createItem(req: Request, res: Response) {
    let item: IItem = req.body;
    if (item.name && item.purchase_date && item.merchant_id !== undefined) {
      const data = await ItemModel.createItem(item);
      res.send(data);
    } else {
      res.send("Unprocessable Entity");
      res.status(422);
    }
  }

  public async getItem(req: Request, res: Response) {
    let item: number = parseInt(req.params.id);
    if (item) {
      const data = await ItemModel.getItem(item);
      res.send(data);
    } else {
      res.send("Unprocessable Entity");
      res.status(422);
    }
  }
}