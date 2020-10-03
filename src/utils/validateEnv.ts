import {
    cleanEnv, port,
} from 'envalid';

export function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
    });
}