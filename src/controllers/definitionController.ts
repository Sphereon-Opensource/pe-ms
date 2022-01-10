import { transformAndValidate } from "class-transformer-validator";
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { PresentationDefinitionService } from "../service/presentationDefinitionService";
import { generateDefinitionUrl } from "../utils/apiUtils";

import { ApiError } from "./error_handler/errorHandler";

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationDefinitionService()
    const presentationDefinitionWrapper = (await transformAndValidate(PresentationDefinitionWrapperEntity, req.body)) as PresentationDefinitionWrapperEntity;
    presentationDefinitionWrapper.challenge = service.createChallengeToken(presentationDefinitionWrapper.challenge)
    service.evaluateDefinition(presentationDefinitionWrapper)
    await getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper).then((data) => {
          res.status(201).json(generateDefinitionUrl(req))
    }).catch(e => { throw new ApiError(e.message) });
  } catch(error) {
    if (Array.isArray(error)) {
      next(new ApiError(JSON.stringify(error.map((e: any) => {
        return { property: e.property, constraints: e.constraints }
      }))));
    } else {
      next(error);
    }
  }
};

const retrieveDefinitionById = (req: Request, res: Response, next: NextFunction) => {
  getMongoRepository(PresentationDefinitionWrapperEntity)
      .findOne({ id: req.params['id'] }).then(data => {
  if (data) {
    res.status(200).json(data)
  } else {
    next()
  }
  });
};

const updateDefinitionStatus = (req: Request, res: Response, next: NextFunction) => {
  next(new Error(`PUT ${req.protocol}://${req.headers.host}${req.baseUrl}/definitions/${req.params['id']}/status not implemented yet`))
}

const retrieveDefinitionStatus = (req: Request, res: Response, next: NextFunction) => {
  next(new Error(`GET ${req.protocol}://${req.headers.host}${req.baseUrl}/definitions/${req.params['id']}/status not implemented yet`))
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinitionById);
DEFINITIONS_CONTROLLER.put('/definitions/:id/status', updateDefinitionStatus);
DEFINITIONS_CONTROLLER.get('/definitions/:id/status', retrieveDefinitionStatus);
