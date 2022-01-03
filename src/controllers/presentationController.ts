import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import {
  PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";
import { PresentationWrapperEntity } from '../entity/presentationWrapper/presentationWrapperEntity';
import { PresentationService } from "../service/presentationService";
import { setCallbackUrl, validateProperties } from "../utils/apiUtils";

import { ApiError } from "./error_handler/errorHandler";

const requestBodyProperties = ['pdId', 'presentation', 'challenge']
export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationService()
    const pWrapper: PresentationWrapperEntity = req.body
    validateProperties(requestBodyProperties, req)
    service.validateProof(pWrapper)
    const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity).findOne(req.body.pdId);
    if (pdWrapper) {
      service.validateChallengeToken(pdWrapper, pWrapper)
      service.evaluatePresentation(pdWrapper, pWrapper)
      getMongoRepository(PresentationWrapperEntity).save(pWrapper).then((data) => {
        pWrapper.callback = setCallbackUrl(req, data)
        res.status(201).json(data)
      });
    } else {
      throw new ApiError('presentation_definition_wrapper not found');
    }
  } catch (error) {
    next(error)
  }
}

const retrievePresentation = async (req: Request, res: Response) => {
  const repository = getMongoRepository(PresentationWrapperEntity);
  repository
    .findOne(req.params['id'])
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404)); //presentation wrapper
};

const retrievePresentationStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: 'method not implemented yet' }); // presentation status
};

const updatePresentationStatus = (req: Request, res: Response) => {
  //status response
  res.status(201).json({ message: 'method not implemented yet' }); // presentation status
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
