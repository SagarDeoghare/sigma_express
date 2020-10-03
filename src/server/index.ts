import express = require('express');
import morgan = require('morgan');
import { ServerStream, logger } from '../config/winston';
import { Routes } from '../router';

const {
    PORT,
} = process.env;

export class TheServer {
    private readonly theApp: express.Application = express();
    private router: Routes = new Routes();
    
    private intializeUsage() {
        this.theApp.use(express.json());
        this.theApp.use(morgan('combined', { stream: new ServerStream() }));
        this.router.routes(this.theApp);
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