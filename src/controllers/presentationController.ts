import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { StatusWrapperEntity } from '../entity/status/statusWrapperEntity';
import { PresentationService } from '../service/presentationService';
import { createChallengeToken, validateChallengeToken, validateThreadId } from '../utils/apiUtils';

import { ApiError, handleErrors } from './error_handler/errorHandler';

export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationService();
    const pWrapper = (await transformAndValidate(PresentationWrapperEntity, req.body)) as PresentationWrapperEntity;
    service.checkExpiredVcs(pWrapper.presentation.verifiableCredential);
    service.validateProof(pWrapper);
    const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity).findOne({ id: pWrapper.pdId });
    if (pdWrapper) {
      validateThreadId(pdWrapper, pWrapper);
      validateChallengeToken(pdWrapper.challenge.token, pWrapper.challenge.token);
      pWrapper.challenge = createChallengeToken(pWrapper.challenge);
      const result = service.evaluatePresentation(pdWrapper, pWrapper);
      const presentation = await getMongoRepository(PresentationWrapperEntity).save(pWrapper);
      await getMongoRepository(StatusWrapperEntity).updateOne(
        { 'thread.id': presentation.thread.id },
        {
          $set: {
            presentation_id: presentation.id,
            status: ExchangeStatus.Submitted,
          },
        }
      );
      res
        .status(201)
        .json({ thread: presentation.thread, presentation_id: presentation.id, warnings: result.warnings });
    } else {
      throw new ApiError('presentation_definition_wrapper not found');
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const retrievePresentation = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(PresentationWrapperEntity)
    .findOne({ id: req.params['id'] })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        next();
      }
    });
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
