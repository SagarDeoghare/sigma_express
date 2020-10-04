
import { logger } from '../config/winston';
import { Model } from './model';

export interface IUser {
    name: string,
    password: string,
    email: string
};

export class UserModel extends Model {

    static async createUser(user: IUser): Promise<IUser> {
        logger.info("Create user enter...");
        const newUser = await Model.prisma.user.create({
            data: { name: user.name, password: user.password, email: user.email },
        });
        logger.info("Create user exit...");
        return newUser;
    }
}