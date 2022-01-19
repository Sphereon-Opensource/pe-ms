import { EvaluationResults, IProof, IVerifiableCredential, ProofType } from '@sphereon/pex';
import { PEX } from '@sphereon/pex';
import { InputDescriptorV1, InputDescriptorV2 } from '@sphereon/pex-models';
import { SSITypesBuilder } from '@sphereon/pex/dist/main/lib/types/SSITypesBuilder';

import { ApiError } from '../controllers/error_handler/errorHandler';
import { PresentationWrapperEntity } from '../entity/presentation/presentationWrapperEntity';
import { PresentationDefinitionWrapperEntity } from '../entity/presentationDefinition/presentationDefinitionWrapperEntity';

export class PresentationService {
  public validateProof = (pWrapper: PresentationWrapperEntity) => {
    let proofValid;
    if (Array.isArray(pWrapper.presentation.proof)) {
      proofValid = pWrapper.presentation.proof.find((p: IProof) => ProofType[p.type as ProofType]);
    } else {
      proofValid = ProofType[pWrapper.presentation.proof?.type as ProofType];
    }
    if (pWrapper.presentation.proof && !proofValid) {
      throw new ApiError('presentation contains an invalid signature');
    }
  };

  public checkExpiredVcs = (vcs: IVerifiableCredential[]) => {
    const internalVcs = SSITypesBuilder.mapExternalVerifiableCredentialsToInternal(vcs);
    const expiredVcs = internalVcs.filter(
      (vc) => +new Date(vc.getBaseCredential().credentialSubject.expirationDate as string) <= Date.now()
    );
    if (expiredVcs.length) {
      throw new ApiError(`Vcs are expired: ${expiredVcs.map((vc) => vc.id).join(', ')}`);
    }
  };

  public evaluatePresentation = (
    pdWrapper: PresentationDefinitionWrapperEntity,
    pWrapper: PresentationWrapperEntity
  ): EvaluationResults => {
    const peJs = new PEX();
    const evaluationResults = peJs.evaluatePresentation(pdWrapper.presentation_definition, pWrapper.presentation);
    if (Object.keys(pdWrapper.presentation_definition).includes('input_descriptors')) {
      const inputDescriptors = (
        pdWrapper.presentation_definition.input_descriptors as (InputDescriptorV1 | InputDescriptorV2)[]
      ).map((inDesc) => inDesc.id);
      if (
        !evaluationResults.value?.descriptor_map.map((dm) => dm.id).every((inDesc) => inputDescriptors.includes(inDesc))
      ) {
        throw new ApiError('Not all input descriptors are satisfied', {
          ...evaluationResults,
          thread: pWrapper.thread,
          challenge: pWrapper.challenge,
        });
      }
    }
    return evaluationResults;
  };
}
