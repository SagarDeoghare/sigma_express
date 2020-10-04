// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";

export class BadUrlHandler {
  public handler(req: Request, res: Response) {
    throw new Error('Bad Request');
  }
}