import url from 'url';

import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { PresentationStatusEntity } from '../entity/status/presentationStatusEntity';
import { ThreadEntity } from '../entity/threadEntity';
import { PresentationService } from '../service/presentationService';
import { updateChallengeToken } from '../utils/apiUtils';

import { ApiError, handleErrors } from './error_handler/errorHandler';

export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationService();
    const pWrapper = (await transformAndValidate(PresentationWrapperEntity, req.body)) as PresentationWrapperEntity;
    const thread: ThreadEntity = await updateChallengeToken({
      id: pWrapper.thread.id,
      challenge: pWrapper.challenge,
    });
    pWrapper.challenge = thread.challenge;
    service.checkExpiredVcs(pWrapper.presentation.verifiableCredential);
    service.validateProof(pWrapper);
    const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity).findOne({ id: pWrapper.pdId });
    if (pdWrapper) {
      const result = service.evaluatePresentation(pdWrapper, pWrapper);
      const presentation = await getMongoRepository(PresentationWrapperEntity).save(pWrapper);
      await getMongoRepository(PresentationStatusEntity).save({
        presentation_id: presentation.id,
        status: ExchangeStatus.Submitted,
      });
      res
        .status(201)
        .json({ thread: { id: thread.id }, challenge: thread.challenge, presentation_id: presentation.id, result });
    } else {
      throw new ApiError('presentation_definition_wrapper not found');
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const retrievePresentationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = url.parse(req.url, true).query;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: query.thread_id,
      challenge: { token: query.token },
    });
    const thread: ThreadEntity = await updateChallengeToken(threadEntity);
    const result = await getMongoRepository(PresentationWrapperEntity)
      .aggregate([{ $match: { id: req.params['id'] } }, { $project: { _id: 0 } }])
      .next();
    if (result) {
      res.status(200).json({ ...result, thread: { id: thread.id }, challenge: thread.challenge });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const retrievePresentationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = url.parse(req.url, true).query;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: query.thread_id,
      challenge: { token: query.token },
    });
    const thread: ThreadEntity = await updateChallengeToken(threadEntity);
    const result = await getMongoRepository(PresentationStatusEntity)
      .aggregate([{ $match: { presentation_id: req.params['id'] } }, { $project: { _id: 0 } }])
      .next();
    if (result) {
      res.status(200).json({ ...result, thread: { id: thread.id }, challenge: thread.challenge });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const updatePresentationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusWrapper = (await transformAndValidate(PresentationStatusEntity, req.body)) as PresentationStatusEntity;
    const thread: ThreadEntity = await updateChallengeToken({
      id: statusWrapper.thread.id,
      challenge: statusWrapper.challenge,
    });
    const result = await getMongoRepository(PresentationStatusEntity).updateOne(
      { presentation_id: statusWrapper.presentation_id },
      { $set: statusWrapper },
      { upsert: false }
    );
    if (result.modifiedCount) {
      res.status(200).json({
        ...(await getMongoRepository(PresentationStatusEntity)
          .aggregate([{ $match: { presentation_id: req.params['id'] } }, { $project: { _id: 0 } }])
          .next()),
        thread: { id: thread.id },
        challenge: thread.challenge,
      });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentationById);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
