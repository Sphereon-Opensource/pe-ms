import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';

import { ThreadEntity } from '../entity/threadEntity';
export const THREAD_CONTROLLER = Router();

const createThread = async (req: Request, res: Response) => {
  res.status(201).json(await getRepository(ThreadEntity).save(new ThreadEntity()));
};

THREAD_CONTROLLER.post('/threads', createThread);
