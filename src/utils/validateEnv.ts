import {
    cleanEnv, port, str
} from 'envalid';

export function validateEnv() {
    console.log(process.env.PORT);
    cleanEnv(process.env, 
        {
            PORT: port(),
            DATABASE_URL: str()
        }, 
        { 
            dotEnvPath: null
        });
}