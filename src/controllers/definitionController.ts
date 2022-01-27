import url from 'url';

import { ExchangeStatus } from '@sphereon/pex-models';
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';
import { DefinitionStatusEntity } from '../entity/status/definitionStatusEntity';
import { ThreadEntity } from '../entity/threadEntity';
import { PresentationDefinitionService } from '../service/presentationDefinitionService';
import { generateDefinitionsResponseBody, updateChallengeToken } from '../utils/apiUtils';

import { handleErrors } from './error_handler/errorHandler';

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new PresentationDefinitionService();
    const presentationDefinitionWrapper = (await transformAndValidate(
      PresentationDefinitionWrapperEntity,
      req.body
    )) as PresentationDefinitionWrapperEntity;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: presentationDefinitionWrapper.thread.id,
      challenge: presentationDefinitionWrapper.challenge,
    });
    const thread: ThreadEntity = await updateChallengeToken(threadEntity);
    presentationDefinitionWrapper.challenge = thread.challenge;
    service.evaluateDefinition(presentationDefinitionWrapper.presentation_definition, thread);
    await getMongoRepository(PresentationDefinitionWrapperEntity).save(presentationDefinitionWrapper);
    await getMongoRepository(DefinitionStatusEntity).save({
      definition_id: presentationDefinitionWrapper.id,
      status: ExchangeStatus.Created,
    });
    res.status(201).json(generateDefinitionsResponseBody(req, thread));
  } catch (error) {
    handleErrors(error, next);
  }
};

const retrieveDefinitionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = url.parse(req.url, true).query;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: query.thread_id,
      challenge: { token: query.token },
    });
    const thread: ThreadEntity = await updateChallengeToken(threadEntity);
    const result = await getMongoRepository(PresentationDefinitionWrapperEntity)
      .aggregate([{ $match: { id: req.params['id'] } }, { $project: { _id: 0 } }])
      .next();
    if (result) {
      res.status(200).json({ ...result, thread: { id: thread.id }, challenge: thread.challenge });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const retrieveDefinitionStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = url.parse(req.url, true).query;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: query.thread_id,
      challenge: { token: query.token },
    });
    const thread: ThreadEntity = await updateChallengeToken(threadEntity);
    const result = await getMongoRepository(DefinitionStatusEntity)
      .aggregate([{ $match: { definition_id: req.params['id'] } }, { $project: { _id: 0 } }])
      .next();
    if (result) {
      res.status(200).json({ ...result, thread: { id: thread.id }, challenge: thread.challenge });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

const updateDefinitionStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const statusWrapper = (await transformAndValidate(DefinitionStatusEntity, req.body)) as DefinitionStatusEntity;
    const threadEntity = await transformAndValidate(ThreadEntity, {
      id: statusWrapper.thread.id,
      challenge: statusWrapper.challenge,
    });
    const thread = await updateChallengeToken(threadEntity);
    const result = await getMongoRepository(DefinitionStatusEntity).updateOne(
      { definition_id: statusWrapper.definition_id },
      { $set: statusWrapper },
      { upsert: false }
    );
    if (result.modifiedCount) {
      res.status(200).json({
        ...(await getMongoRepository(DefinitionStatusEntity)
          .aggregate([{ $match: { definition_id: statusWrapper.definition_id } }, { $project: { _id: 0 } }])
          .next()),
        thread: { id: thread.id },
        challenge: thread.challenge,
      });
    } else {
      res.status(404).json({ thread: { id: thread.id }, challenge: thread.challenge });
    }
  } catch (error) {
    handleErrors(error, next);
  }
};

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinitionById);
DEFINITIONS_CONTROLLER.post('/definitions/:id/statuses', updateDefinitionStatus);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatus);
