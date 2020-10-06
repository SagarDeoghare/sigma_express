import { Request, Response } from "express";
import { IUser, UserModel } from '../models/user';
import { body } from 'express-validator';
import { logger } from "../config/winston";
import * as express from 'express';
import { IController } from './index';
export class UserController implements IController{
  private path: string = "/user";
  private router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes()
  }

  setRouter() {
    this.router.post(this.path, this.validate('create'), this.createUser);
  }

  getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    this.setRouter();
  }

  public async createUser(req: Request, res: Response) {
    logger.info("create enter...");
    let user: IUser = req.body;
    if (user.name && user.password && user.email) {
      user = await UserModel.createUser(user);
    } else {
      res.send("Unprocessable Entity");
      res.status(422);
    }
    res.send(user);
    logger.info("create exit...");
  }

  public validate(method: string) {
    let validateResult: any = [];
    switch (method) {
      case 'create':
        validateResult = [
          body('user', "userName doesn't exists").exists(),
          body('email', "'Invalid email'").exists().isEmail(),
          body('phone').optional().isInt(),
          body('status').optional().isIn(['enabled', 'disabled']),
          body('password', "password must exists").exists()
        ]
        break;
    }
    return validateResult;
  }
}