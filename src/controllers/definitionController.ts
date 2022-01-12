import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { StatusWrapperEntity } from '../entity/status/statusWrapperEntity';
import { PresentationDefinitionService } from '../service/presentationDefinitionService';
import { createChallengeToken, generateDefinitionUrl } from '../utils/apiUtils';

import { ApiError } from './error_handler/errorHandler';

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationDefinitionService();
    const presentationDefinitionWrapper = (await transformAndValidate(
      PresentationDefinitionWrapperEntity,
      req.body
    )) as PresentationDefinitionWrapperEntity;
    presentationDefinitionWrapper.challenge = createChallengeToken(presentationDefinitionWrapper.challenge);
    service.evaluateDefinition(presentationDefinitionWrapper);
    await getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper);
    await getMongoRepository(StatusWrapperEntity).save({
      thread: presentationDefinitionWrapper.thread,
      status: ExchangeStatus.Created,
    });
    res.status(201).json(generateDefinitionUrl(req));
  } catch (error) {
    if (Array.isArray(error)) {
      next(
        new ApiError(
          JSON.stringify(
            error.map((e: any) => {
              return { property: e.property, constraints: e.constraints };
            })
          )
        )
      );
    } else {
      next(error);
    }
  }
};

const retrieveDefinitionById = (req: Request, res: Response, next: NextFunction) => {
  getMongoRepository(PresentationDefinitionWrapperEntity)
    .findOne({ id: req.params['id'] })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        next();
      }
    });
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinitionById);
