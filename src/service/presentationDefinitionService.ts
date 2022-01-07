import { randomBytes } from "crypto";

import { PEX } from "@sphereon/pex";
import { Validated } from "@sphereon/pex";
import { Challenge } from "@sphereon/pex-models";

import { ApiError } from "../controllers/error_handler/errorHandler";
import {
    PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";

export class PresentationDefinitionService {

    public evaluateDefinition = (pdWrapper: PresentationDefinitionWrapperEntity) => {
        const pejs = new PEX();
        const validationResult: Validated = pejs.validateDefinition(pdWrapper.presentation_definition);
        if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
            throw new ApiError(JSON.stringify(validationResult));
        }
    }

    public createChallengeToken = (challenge: Challenge) => {
        return {
            ...challenge,
            token: randomBytes(64).toString('hex')
        }
    }
}