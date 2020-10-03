import 'dotenv/config';
import { TheServer } from "./server"
import { validateEnv } from './utils/validateEnv';
 
validateEnv();

new TheServer().startServer();