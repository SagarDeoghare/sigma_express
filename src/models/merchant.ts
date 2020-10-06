
import { logger } from '../config/winston';
import { Model } from './model';

export interface IMerchant {
    name: string,
    landline: number | null,
    mobile: number
};

export class MerchantModel extends Model {

    static async createUser(merchant: IMerchant): Promise<IMerchant> {
        logger.info("Create Merchant enter...");
        const newData = await Model.prisma.merchant.create({
            data: { name: merchant.name, mobile: merchant.mobile, landline: merchant.landline },
        });
        logger.info("Create Merchant exit...");
        return newData;
    }
}