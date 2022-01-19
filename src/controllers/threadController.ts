import { randomBytes } from 'crypto';

import { NextFunction, Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';

import { ChallengeEntity } from '../entity/challengeEntity';
import { ThreadEntity } from '../entity/threadEntity';
export const THREAD_CONTROLLER = Router();

const createThread = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const thread = new ThreadEntity();
    thread.challenge = new ChallengeEntity(randomBytes(16).toString('hex'));
    const result = await getRepository(ThreadEntity).save(thread);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

THREAD_CONTROLLER.post('/threads', createThread);
