import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';

import { ThreadEntity } from '../entity/threadEntity';

export const THREAD_CONTROLLER = Router();

const createThread = async (req: Request, res: Response) => {
  const thread: ThreadEntity = req.body;
  const repository = getRepository(ThreadEntity);
  res.status(201).json(await repository.save(thread));
};

THREAD_CONTROLLER.post('/threads', createThread);
