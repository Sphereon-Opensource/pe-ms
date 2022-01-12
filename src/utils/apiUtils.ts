import { randomBytes } from 'crypto';

import { Challenge } from '@sphereon/pex-models';
import { Request } from 'express';

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
