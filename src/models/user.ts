
import { logger } from '../config/winston';
import { Model } from './model';
import { str } from 'envalid';

export interface IUser {
    name: string,
    password: string,
    email: string,
    mobile: number,
    address: string | null
};

export class UserModel extends Model {

    static async createUser(user: IUser): Promise<IUser> {
        logger.info("Create user enter...");
        const newUser = await Model.prisma.user.create({
            data: { name: user.name, 
                password: user.password, 
                email: user.email,
                mobile: user.mobile,
                address: user.address
            },
        });
        logger.info("Create user exit...");
        return newUser;
    }
}