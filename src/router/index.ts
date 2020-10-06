
import { UserController } from "../controllers/user.controller";
import { ItemController } from "../controllers/item.controller";
import { MerchantController } from '../controllers/merchant.controller';
import { BillBookController } from "../controllers/bill_book.controller";
import { BillItemController } from '../controllers/bill_item.controller';
export class Routes {
   
   public getController() {
      const controller: any =  [
         new UserController(),
         new ItemController(),
         new MerchantController(),
         new BillBookController(),
         new BillItemController()
      ];
      return controller;
   }
}