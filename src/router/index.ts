
import { UserController } from "../controllers/user.controller";
export class Routes {
   
   public getController() {
      const controller: any =  [
         new UserController()
      ];
      return controller;
   }
}