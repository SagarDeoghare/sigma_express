import * as dotenv from 'dotenv';
import { TheServer } from "./server"
import { validateEnv } from './utils/validateEnv';

dotenv.config({ path: '../prisma/.env' });
validateEnv();

new TheServer().startServer();