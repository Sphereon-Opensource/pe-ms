import { Thread } from '@sphereon/pe-models';
import { Request, Response, Router, NextFunction } from 'express';

export const THREAD_CONTROLLER = Router();

const createThread = (req: Request, res: Response, next: NextFunction) => {
    const thread: Thread = req.body;
    res.status(201).json(thread);
}

THREAD_CONTROLLER.post('/threads', createThread);