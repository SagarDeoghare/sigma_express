import express = require('express');
import morgan = require('morgan');
import { ServerStream, logger } from '../config/winston';
const {
    PORT,
} = process.env;

export class TheServer {
    private readonly theApp: express.Application = express();
    
    private intializeUsage() {
        this.theApp.use(morgan('combined', { stream: new ServerStream() }));
    }

    constructor() {
        this.intializeUsage();
    }

    public startServer() {
        this.theApp.listen(PORT, () => {
            logger.info(`Server started at:: ${PORT}`);
        });
    }
}