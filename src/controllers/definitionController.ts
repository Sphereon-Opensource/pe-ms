import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { PresentationDefinitionService } from "../service/presentationDefinitionService";
import { setCallbackUrl, validateProperties } from "../utils/apiUtils";

import { ApiError } from "./error_handler/errorHandler";

const requestBodyProperties = ['thread', 'presentation_definition']
export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationDefinitionService()
    const presentationDefinitionWrapper: PresentationDefinitionWrapperEntity = req.body;
    validateProperties(requestBodyProperties, req)
    if (presentationDefinitionWrapper.presentation_definition) {
      presentationDefinitionWrapper.challenge = service.createChallengeToken(presentationDefinitionWrapper.challenge)
      service.evaluateDefinition(presentationDefinitionWrapper)
      getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper).then((data) => {
        presentationDefinitionWrapper.callback = setCallbackUrl(req, data),
            res.status(201).json(data)
      });
    } else {
      throw new ApiError('presentation_definition_wrapper does not have a presentation_definition');
    }
  } catch(error) {
    next(error)
  }
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
