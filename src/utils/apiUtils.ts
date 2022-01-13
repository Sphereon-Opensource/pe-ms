import { randomBytes } from 'crypto';

import { Challenge } from '@sphereon/pex-models';
import { Request } from 'express';

import { ApiError } from '../controllers/error_handler/errorHandler';
import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';

export const generateDefinitionUrl = (req: Request) => {
  return {
    definition_url: `${req.protocol}://${req.headers.host}${req.baseUrl}/definitions/${req.body.presentation_definition.id}`,
  };
};

export const createChallengeToken = (challenge: Challenge) => {
  return {
    ...challenge,
    token: randomBytes(64).toString('hex'),
  };
};

export const validateChallengeToken = (challengeTokenA?: string, challengeTokenB?: string) => {
  if ((!challengeTokenA || !challengeTokenB) && challengeTokenA !== challengeTokenB) {
    throw new ApiError('Invalid challenge token');
  }
};

export const validateThreadId = (
  pdWrapper: PresentationDefinitionWrapperEntity,
  pWrapper: PresentationWrapperEntity
) => {
  if (pdWrapper.thread.id !== pWrapper.thread.id) {
    throw new ApiError('Invalid thread id');
  }
};
