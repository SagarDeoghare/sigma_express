import { PrismaClient } from "@prisma/client";

export class Model {
    static prisma: PrismaClient = new PrismaClient();
}