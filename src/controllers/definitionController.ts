import {Resource} from "@sphereon/pe-models";
import { Request, Response, Router } from 'express';
import {getMongoRepository } from 'typeorm';

import { PresentationDefinitionEntity } from "../entity/presentationDefinition/presentationDefinitionEntity";

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response) => {
  const presentationDefinition: PresentationDefinitionEntity = req.body.presentation_definition
  const repository = getMongoRepository(PresentationDefinitionEntity);
  const result = await repository.save(presentationDefinition); // presentation definition wrapper
  res.status(201).json(result);
};

const retrieveDefinition = async (req: Request, res: Response) => {
  const definitionRepository = getMongoRepository(PresentationDefinitionEntity);
  const result = await definitionRepository.findOne(req.params['id']); //presentation definition wrapper
  if (result) {
    res.status(200).json(result);
  }
  res.status(404);
};

const retrieveDefinitionStatuses = async (req: Request, res: Response) => {
  const definitionRepository = getMongoRepository(PresentationDefinitionEntity);
  const result = await definitionRepository.findOne(req.params['id']);
  if (result) {
    res.status(200).json({
      definition_id: req.params['id'],
      statuses: result?.input_descriptors.map(id => id.constraints?.statuses)
    });
  }
  res.status(404); //presentation status wrapper
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatuses);
