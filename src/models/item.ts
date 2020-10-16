
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
    merchant_id: number,
    item_size: string,
    bill_id: string
};

export class ItemModel extends Model {

    static async createItem(item: IItem): Promise<IItem | string> {
        let result: any;
        try {
            result = await Model.prisma.item.create({
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
                    },
                    item_size: item.item_size,
                    bill_id: item.bill_id
                },
            });
        } catch (error) {
            result = error.message
        }
        return result;  
    }

    static async getItem(item: number): Promise<IItem | string> {
        let result: any;
        try {
            const items = await Model.prisma.item.findOne( {
                where: {
                    id: item
                }
            });
        } catch (error) {
            result = error.message
        }
        return result;  
    }
}