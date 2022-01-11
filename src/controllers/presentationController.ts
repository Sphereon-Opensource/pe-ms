import { ExchangeStatus } from "@sphereon/pex-models";
import { transformAndValidate } from "class-transformer-validator";
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import {
  PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";
import { StatusWrapperEntity } from '../entity/status/statusWrapperEntity';
import { PresentationService } from "../service/presentationService";

import { ApiError } from "./error_handler/errorHandler";


export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationService()
    const pWrapper = (await transformAndValidate(PresentationWrapperEntity, req.body)) as PresentationWrapperEntity;
    service.checkExpiredVcs(pWrapper.presentation.verifiableCredential);
    service.validateProof(pWrapper);
    const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity).findOne({ id: pWrapper.pdId });
    if (pdWrapper) {
      service.validateChallengeToken(pdWrapper, pWrapper)
      const result = service.evaluatePresentation(pdWrapper, pWrapper)
      await getMongoRepository(PresentationWrapperEntity).save(pWrapper).then((data) => {
        getMongoRepository(StatusWrapperEntity).save({ thread: data.thread, presentation_id: data.id, status: ExchangeStatus.Submitted })
            .then(status => res.status(201).json({ thread: data.thread, presentation_id: data.id, warnings: result.warnings }))
      }).catch(e => { throw new ApiError(e.message) });
    } else {
      throw new ApiError('presentation_definition_wrapper not found');
    }
  } catch (error) {
      if (Array.isArray(error)) {
          next(new ApiError(JSON.stringify(error.map((e: any) => {
              return { property: e.property, constraints: e.constraints }
          }))));
      } else {
          next(error);
      }
  }
}

const retrievePresentation = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(PresentationWrapperEntity)
    .findOne({ id: req.params['id'] })
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        next()
      }
    });
};

const retrievePresentationStatus = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(StatusWrapperEntity)
      .findOne({ presentation_id: req.params['id'] })
      .then(data => {
        if (data) {
          res.status(200).json(data);
        } else {
          next();
        }
      })
};

const updatePresentationStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statusWrapper = (await transformAndValidate(StatusWrapperEntity, req.body)) as StatusWrapperEntity;
        if (req.params['id'] !== statusWrapper.presentation_id) {
            throw new ApiError('presentation_id in the request body and path must be the same')
        }
        return getMongoRepository(StatusWrapperEntity).updateOne({ presentation_id: statusWrapper.presentation_id }, { $set: statusWrapper }, { upsert: false })
            .then(data => {
                    res.redirect(`${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}`)
            })
    } catch(error) {
        next(error)
    }
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
