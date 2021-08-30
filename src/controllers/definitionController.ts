import {
  Callback,
  ExchangeStatus,
  PresentationDefinitionWrapper,
  PresentationStatusWrapper,
} from '@sphereon/pe-models';
import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { getRepository } from 'typeorm';

import { CallbackEntity } from '../entity/callbackEntity';
import { ChallengeEntity } from '../entity/challengeEntity';
import { PresentationDefinitionEntity } from '../entity/presentationDefinitionEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinitionWrapperEntity';
import { ThreadEntity } from '../entity/threadEntity';

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response) => {
  const pdwRepository = getRepository(PresentationDefinitionEntity);
  const pdwe = await pdwRepository.create(req.body.presentation_definition);
  const result = await pdwRepository.save(pdwe);
  res.status(201).json(result);
};

const retrieveDefinition = async (req: Request, res: Response) => {
  const presentationDefinition: PresentationDefinitionWrapper = {
    callback: {
      url: 'http:localhost:8080',
    },
    challenge: {
      token: 'asdfasdfjlk;adsjf',
      holder: 'did:example:123',
    },
    thread: {
      id: 'asdlfas;dlf',
    },
    presentation_definition: {
      id: 'test',
      input_descriptors: [
        {
          id: 'test',
          schema: [
            {
              uri: 'http://test.com',
            },
          ],
        },
      ],
    },
  };
  res.status(200).json(presentationDefinition);
};

const retrieveDefinitionStatuses = async (req: Request, res: Response) => {
  const status: PresentationStatusWrapper = {
    definition_id: 'test',
    statuses: [{ presentation_id: 'test', status: ExchangeStatus.Accepted }],
  };
  res.status(200).json(status);
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatuses);
