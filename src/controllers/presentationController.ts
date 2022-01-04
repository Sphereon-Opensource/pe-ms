import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import {
  PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";
import { StatusWrapperEntity } from '../entity/status/statusWrapperEntity';
import { PresentationService } from "../service/presentationService";
import { setCallbackUrl, validateProperties } from "../utils/apiUtils";

import { ApiError } from "./error_handler/errorHandler";


const requestedPresentationProperties = ['pdId', 'presentation', 'challenge'];
const requestedStatusProperties = ['thread', 'presentation_id', 'status', 'message', 'challenge'];
export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationService()
    const pWrapper: PresentationWrapperEntity = req.body
    validateProperties(requestedPresentationProperties, req)
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

const retrievePresentation = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(PresentationWrapperEntity)
    .findOne(req.params['id'])
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        next()
      }
    });
};

const retrievePresentationStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: 'method not implemented yet' }); // presentation status
};

const updatePresentationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateProperties(requestedStatusProperties, req);
    return getMongoRepository(StatusWrapperEntity).updateOne({ presentation_id: req.params['id'] }, { $set: req.body }, { upsert: true })
        .then(data => {
            res.redirect(`${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`)
        })
  } catch(error) {
    next(error)
  }
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.put('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
