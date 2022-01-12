import { PEX } from '@sphereon/pex';
import { Validated } from '@sphereon/pex';

import { ApiError } from '../controllers/error_handler/errorHandler';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';

export class PresentationDefinitionService {
  public evaluateDefinition = (pdWrapper: PresentationDefinitionWrapperEntity) => {
    const pejs = new PEX();
    const validationResult: Validated = pejs.validateDefinition(pdWrapper.presentation_definition);
    if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
      throw new ApiError(JSON.stringify(validationResult));
    }
  };
}
