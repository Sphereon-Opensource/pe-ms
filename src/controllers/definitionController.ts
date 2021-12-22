import { randomBytes } from "crypto";

import { PEJS } from '@sphereon/pe-js/dist/main/lib';
import { Validated } from '@sphereon/pe-js/dist/module';
import { Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';


export const DEFINITIONS_CONTROLLER = Router();
const createDefinition = (req: Request, res: Response) => {
  const pejs: PEJS = new PEJS();
  const presentationDefinitionWrapper: PresentationDefinitionWrapperEntity = req.body;
  if (req.body?.presentation_definition) {
    const validationResult: Validated = pejs.validateDefinition(req.body?.presentation_definition);
    if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
      res.status(400).json(validationResult);
    }
  } else {
    res.status(400).json({ error: 'presentation_definition_wrapper does not have a presentation_definition' });
  }
  presentationDefinitionWrapper.challenge = {
    ...presentationDefinitionWrapper.challenge,
    token: randomBytes(64).toString('hex')
  }
  getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper).then((data) => {
    const path = `${new URL(`${req.protocol}://${req.headers.host}${req.originalUrl}`).pathname}/${data._id.toHexString()}`
    presentationDefinitionWrapper.callback = {
      url: `${req.protocol}://${req.headers.host}${path}`
    }
    res.status(201).json(data)
  });
};

const retrieveDefinition = (req: Request, res: Response) => {
  const definitionWrapperRepository = getMongoRepository(PresentationDefinitionWrapperEntity);
  if (req.query) {
    definitionWrapperRepository
      .find(req.query)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => res.status(404).json(error));
  } else {
    res.status(400).json({message: "request doesn't have query params."});
  }
};

const retrieveDefinitionById = async (req: Request, res: Response) => {
  const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity)
      .findOne(req.params['id'])
  if (pdWrapper) {
    res.status(200).json(pdWrapper)
  } else {
    res.status(404).json({message: "Presentation definition not found."})
  }
};

const retrieveDefinitionStatuses = (req: Request, res: Response) => {
  const definitionRepository = getMongoRepository(PresentationDefinitionWrapperEntity);
  definitionRepository
    .findOne(req.params['id'])
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json(error)); //presentation status wrapper
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinitionById);
DEFINITIONS_CONTROLLER.get('/definitions', retrieveDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatuses);
