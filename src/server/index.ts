import express = require('express');
import morgan = require('morgan');
import cors = require('cors');
import { ServerStream, logger } from '../config/winston';
import { Routes } from '../router';
import { IController } from '../controllers';
import { HttpException } from '../error/httpExceptions';
import { Response } from 'express';

export class TheServer {
    private readonly theApp: express.Application = express();
    private router: Routes = new Routes();
    private port = process.env.PORT;

    private noRoute(request: express.Request, res: express.Response, next: express.NextFunction) {
        const error = new Error('No Route Dear ;)');
        next(error);
    }

    private errorMiddleware(error: HttpException, request: express.Request, response: express.Response, next: express.NextFunction) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        response
            .status(status)
            .send({
                status,
                message,
            })
    }

    private initializeControllers() {
        const controllers = this.router.getController();
        controllers.forEach((controller: IController) => {
            this.theApp.use('/', controller.getRouter());
        });
    }

    private intializeUsage() {
        const host = `http://localhost:${this.port}`;
        this.theApp.use(cors({ credentials: true, origin: host }));
        this.theApp.use(express.json());
        this.theApp.use(morgan('combined', { stream: new ServerStream() }));
        this.initializeControllers();
        this.theApp.use(this.noRoute);
        this.theApp.use(this.errorMiddleware);
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