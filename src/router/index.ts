
import { UserController } from "../controllers/user.controller";
import * as express from 'express';

export class Routes {
   public userController: UserController = new UserController();

   public routes(app: express.Application): void {
      app.route("/").get(this.userController.index);

      app.route("/user")
      .get(this.userController.index)
      .post(this.userController.create);

   }
}