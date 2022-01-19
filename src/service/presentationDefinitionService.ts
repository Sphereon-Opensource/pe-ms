import { IPresentationDefinition, PEX } from '@sphereon/pex';
import { Validated } from '@sphereon/pex';

import { ApiError } from '../controllers/error_handler/errorHandler';
import { ThreadEntity } from '../entity/threadEntity';

export class PresentationDefinitionService {
  public evaluateDefinition = (presentationDefinition: IPresentationDefinition, thread?: ThreadEntity) => {
    const pejs = new PEX();
    const validationResult: Validated = pejs.validateDefinition(presentationDefinition);
    if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
      throw new ApiError('Invalid presentation definition', {
        thread: { id: thread?.id },
        challenge: thread?.challenge,
        errors: validationResult,
      });
    }
  };
}
