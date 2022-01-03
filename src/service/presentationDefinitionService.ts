import { randomBytes } from "crypto";

import { PEJS } from "@sphereon/pe-js/dist/main/lib";
import { Validated } from "@sphereon/pe-js/dist/module";
import { Challenge } from "@sphereon/pe-models";

import { ApiError } from "../controllers/error_handler/errorHandler";
import {
    PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";

export class PresentationDefinitionService {

    public evaluateDefinition = (pdWrapper: PresentationDefinitionWrapperEntity) => {
        const pejs = new PEJS();
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