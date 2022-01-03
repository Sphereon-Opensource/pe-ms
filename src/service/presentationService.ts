import {Proof, ProofType} from "@sphereon/pe-js";
import {PEJS} from "@sphereon/pe-js/dist/main/lib";

import {ApiError} from "../controllers/error_handler/errorHandler";
import {PresentationWrapperEntity} from "../entity/presentation/presentationWrapperEntity";
import {
    PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";

export class PresentationService {

    public validateProof = (pWrapper: PresentationWrapperEntity) => {
        let proofValid;
        if (Array.isArray(pWrapper.presentation.proof)) {
            proofValid = pWrapper.presentation.proof.find((p: Proof) => ProofType[p.type as ProofType]);
        } else {
            proofValid = ProofType[pWrapper.presentation.proof?.type as ProofType]
        }
        if (pWrapper.presentation.proof && !proofValid) {
            throw new ApiError('presentation contains an invalid signature');
        }
    }

    public validateChallengeToken = (pdWrapper: PresentationDefinitionWrapperEntity, pWrapper: PresentationWrapperEntity) => {
        if (pdWrapper.challenge.token !== pWrapper.challenge.token) {
            throw new ApiError('Invalid challenge token')
        }
    }

    public evaluatePresentation = (pdWrapper: PresentationDefinitionWrapperEntity, pWrapper: PresentationWrapperEntity) => {
        const peJs = new PEJS();
        const validationResult = peJs.evaluatePresentation(pdWrapper.presentation_definition, pWrapper.presentation);
        if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
            throw new ApiError(JSON.stringify(validationResult));
        }
    }
}