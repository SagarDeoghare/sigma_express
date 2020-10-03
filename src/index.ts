
import { TheServer } from "./server"
import { validateEnv } from './utils/validateEnv';
import dotenv from 'dotenv';

const path = process.cwd() + '/prisma/.env';
console.log(path);
dotenv.config({ path: path });
validateEnv();

new TheServer().startServer();