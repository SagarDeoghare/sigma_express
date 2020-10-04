import {
    cleanEnv, port, str
} from 'envalid';

export function validateEnv() {
    cleanEnv(process.env, 
        {
            PORT: port(),
            DATABASE_URL: str()
        }, 
        { 
            dotEnvPath: null
        });
}