
import { UserController } from "../controllers/user.controller";
import { ItemController } from "../controllers/item.controller";
export class Routes {
   
   public getController() {
      const controller: any =  [
         new UserController(),
         new ItemController()
      ];
      return controller;
   }
}