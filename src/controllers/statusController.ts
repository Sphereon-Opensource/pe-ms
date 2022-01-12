import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { StatusWrapperEntity } from '../entity/status/statusWrapperEntity';
import { createChallengeToken, validateChallengeToken } from '../utils/apiUtils';

import { handleErrors } from './error_handler/errorHandler';

export const STATUS_CONTROLLER = Router();

const retrieveExchangeStatus = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(StatusWrapperEntity)
    .findOne({ where: { 'thread.id': req.params['thread_id'] } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        next();
      }
    });
};

const updateExchangeStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusWrapper = (await transformAndValidate(StatusWrapperEntity, req.body)) as StatusWrapperEntity;
    const status = await getMongoRepository(StatusWrapperEntity).findOne({
      challenge: { token: statusWrapper.challenge.token },
    });
    validateChallengeToken(status?.challenge.token, statusWrapper.challenge.token);
    statusWrapper.challenge = createChallengeToken(statusWrapper.challenge);
    await getMongoRepository(StatusWrapperEntity).updateOne(
      { 'thread.id': statusWrapper.thread.id },
      { $set: statusWrapper },
      { upsert: false }
    );
    res
      .status(200)
      .json(await getMongoRepository(StatusWrapperEntity).findOne({ thread: { id: statusWrapper.thread.id } }));
  } catch (error) {
    handleErrors(error, next);
  }
};

STATUS_CONTROLLER.post('/status', updateExchangeStatus);
STATUS_CONTROLLER.get('/status/:thread_id', retrieveExchangeStatus);
