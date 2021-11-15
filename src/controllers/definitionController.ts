import { Request, Response, Router } from 'express';
import {getMongoRepository } from 'typeorm';

import { PresentationDefinitionEntity } from "../entity/presentationDefinition/presentationDefinitionEntity";

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = (req: Request, res: Response) => {
  const presentationDefinition: PresentationDefinitionEntity = req.body.presentation_definition
  const repository = getMongoRepository(PresentationDefinitionEntity);
  repository.save(presentationDefinition).then(data => res.status(201).json(data)); // presentation definition wrapper
};

const retrieveDefinition = (req: Request, res: Response) => {
  const definitionRepository = getMongoRepository(PresentationDefinitionEntity);
  definitionRepository.findOne(req.params['id']).then(data =>
        res.status(200).json(data)).catch(error => res.status(404).json(error)); //presentation definition wrapper
};

const retrieveDefinitionStatuses = (req: Request, res: Response) => {
  const definitionRepository = getMongoRepository(PresentationDefinitionEntity);
  definitionRepository.findOne(req.params['id']).then(data =>
    res.status(200).json({
      definition_id: data?._id,
      statuses: data?.input_descriptors.map(inDesc => inDesc.constraints?.statuses)
    })).catch(error => res.status(404)); //presentation status wrapper
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatuses);
