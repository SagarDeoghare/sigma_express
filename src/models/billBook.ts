
import { logger } from '../config/winston';
import { Model } from './model';

export interface IBillBook {
    name: string
    phone: number
    bill_date: Date
    total: number,
    discount: number | null
};

export class BillBookModel extends Model {

    static async createBillItem(billBook: IBillBook): Promise<IBillBook> {
        logger.info("Create item enter...");
        const newItem = await Model.prisma.bill_book.create({
            data: { 
               
               name: billBook.name,
               phone: billBook.phone,
               bill_date: billBook.bill_date,
               total: billBook.total,
               discount: billBook.discount
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