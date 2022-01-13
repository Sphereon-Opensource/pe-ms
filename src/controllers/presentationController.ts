import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { PresentationStatusEntity } from '../entity/status/presentationStatusEntity';
import { PresentationService } from '../service/presentationService';

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
      const result = service.evaluatePresentation(pdWrapper, pWrapper);
      const presentation = await getMongoRepository(PresentationWrapperEntity).save(pWrapper);
      await getMongoRepository(PresentationStatusEntity).save({
        thread: presentation.thread,
        presentation_id: presentation.id,
        status: ExchangeStatus.Submitted,
        challenge: presentation.challenge,
      });
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

const retrievePresentationStatus = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(PresentationStatusEntity)
    .findOne({ presentation_id: req.params['id'] })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        next();
      }
    });
};

const updatePresentationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusWrapper = (await transformAndValidate(PresentationStatusEntity, req.body)) as PresentationStatusEntity;
    await getMongoRepository(PresentationStatusEntity).updateOne(
      { presentation_id: statusWrapper.presentation_id },
      { $set: statusWrapper },
      { upsert: false }
    );
    res
      .status(200)
      .json(
        await getMongoRepository(PresentationStatusEntity).findOne({ presentation_id: statusWrapper.presentation_id })
      );
  } catch (error) {
    handleErrors(error, next);
  }
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
