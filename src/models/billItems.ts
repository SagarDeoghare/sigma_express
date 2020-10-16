
import { logger } from '../config/winston';
import { Model } from './model';

export interface IBillItem {
  item_id: number | null,
  name: string,
  qty: number,
  price: number,
  total: number,
  bill_id: number,
  discount:  number | null
};

export class BillItemModel extends Model {

    static async createBillItem(item: IBillItem): Promise<IBillItem> {
        logger.info("Create item enter...");
        const newItem = await Model.prisma.bill_item.create({
            data: {
               bill_book: {
                   connect: {
                       id: item.bill_id
                   }
               },
               name: item.name,
               qty: item.qty,
               price: item.price,
               total: item.total,
               discount: item.discount
            },
        });
        logger.info("Create item exit...");
        return newItem;
    }

    static async getItems(): Promise<any []> {
        logger.info("Create item enter...");
        const items = await Model.prisma.item.findMany();
        logger.info("Create item exit...");
        return items;
    }
}