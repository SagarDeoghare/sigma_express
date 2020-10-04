import express = require('express');
import morgan = require('morgan');
import cors = require('cors');
import { ServerStream, logger } from '../config/winston';
import { Routes } from '../router';
import { IController } from '../controllers';

export class TheServer {
    private readonly theApp: express.Application = express();
    private router: Routes = new Routes();
    private port = process.env.PORT;
    
    private initializeControllers() {
        const controllers = this.router.getController();
        controllers.forEach((controller: IController) => {
         this.theApp.use('/', controller.getRouter());
       });
    }

    private intializeUsage() {
        const host = `http://localhost:${this.port}`;
        this.theApp.use(cors({credentials: true, origin: host}));
        this.theApp.use(express.json());
        this.theApp.use(morgan('combined', { stream: new ServerStream() }));
        this.initializeControllers();
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