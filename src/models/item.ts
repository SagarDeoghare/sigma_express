
import { logger } from '../config/winston';
import { Model } from './model';

export interface IItem {
    name: string,
    type: string | null,
    purchase_price: number,
    purchase_qty: number,
    purchase_date: Date,
    selling_price: number,
    sell_qty: number,
    merchant_id: number
};

export class ItemModel extends Model {

    static async createItem(item: IItem): Promise<IItem> {
        logger.info("Create item enter...");
        const newItem = await Model.prisma.item.create({
            data: { 
                name: item.name, 
                type: item.type, 
                purchase_date: item.purchase_date,
                purchase_price: item.purchase_price,
                purchase_qty: item.purchase_qty,
                selling_price: item.purchase_qty,
                sell_qty: item.sell_qty,
                merchant: {
                    connect: { 
                        id: item.merchant_id
                    }
                }
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