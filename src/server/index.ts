import express = require('express');
import morgan = require('morgan');
import { ServerStream, logger } from '../config/winston';
import { Routes } from '../router';

export class TheServer {
    private readonly theApp: express.Application = express();
    private router: Routes = new Routes();
    private port = process.env.PORT;
    
    private intializeUsage() {
        this.theApp.use(express.json());
        this.theApp.use(morgan('combined', { stream: new ServerStream() }));
        this.router.routes(this.theApp);
    }

    constructor() {
        this.intializeUsage();
    }

    public startServer() {
        this.theApp.listen(this.port, () => {
            logger.info(`Server started at:: ${this.port}`);
        });
    }
}