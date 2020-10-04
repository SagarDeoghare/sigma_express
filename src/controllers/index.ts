import { Request, Response } from "express";
import * as express from 'express';
export interface IController {
    getRouter(): express.Router,
    setRouter(): void
}