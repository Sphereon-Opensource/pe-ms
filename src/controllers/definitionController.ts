import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { DefinitionStatusEntity } from '../entity/status/definitionStatusEntity';
import { PresentationDefinitionService } from '../service/presentationDefinitionService';
import { generateDefinitionUrl } from '../utils/apiUtils';

import { handleErrors } from './error_handler/errorHandler';

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationDefinitionService();
    const presentationDefinitionWrapper = (await transformAndValidate(
      PresentationDefinitionWrapperEntity,
      req.body
    )) as PresentationDefinitionWrapperEntity;
    service.evaluateDefinition(presentationDefinitionWrapper);
    await getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper);
    await getMongoRepository(DefinitionStatusEntity).save({
      thread: presentationDefinitionWrapper.thread,
      definition_id: presentationDefinitionWrapper.id,
      status: ExchangeStatus.Created,
      challenge: presentationDefinitionWrapper.challenge,
    });
    res.status(201).json(generateDefinitionUrl(req));
  } catch (error) {
    handleErrors(error, next);
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

const retrieveDefinitionStatus = (req: Request, res: Response, next: NextFunction) => {
  return getMongoRepository(DefinitionStatusEntity)
    .findOne({ definition_id: req.params['id'] })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        next();
      }
    });
};

const updateDefinitionStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusWrapper = (await transformAndValidate(DefinitionStatusEntity, req.body)) as DefinitionStatusEntity;
    await getMongoRepository(DefinitionStatusEntity).updateOne(
      { definition_id: statusWrapper.definition_id },
      { $set: statusWrapper },
      { upsert: false }
    );
    res
      .status(200)
      .json(await getMongoRepository(DefinitionStatusEntity).findOne({ definition_id: statusWrapper.definition_id }));
  } catch (error) {
    handleErrors(error, next);
  }
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinitionById);
DEFINITIONS_CONTROLLER.post('/definitions/:id/statuses', updateDefinitionStatus);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatus);
