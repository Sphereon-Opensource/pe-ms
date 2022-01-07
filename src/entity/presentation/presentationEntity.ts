import { IPresentation, IProof } from "@sphereon/pex";
import { Column } from "typeorm";

import { PresentationSubmissionEntity } from "./presentationSubmissionEntity";
import { VerifiableCredentialEntity } from "./verifiableCredentialEntity";

export class PresentationEntity implements IPresentation {
    @Column()
    '@context': string[];
    @Column()
    //@ts-ignore
    type: string[];
    @Column(() => VerifiableCredentialEntity)
    //@ts-ignore
    verifiableCredential: VerifiableCredentialEntity[];
    @Column(() => PresentationSubmissionEntity)
    presentation_submission?: PresentationSubmissionEntity;
    @Column()
    holder?: string;
    @Column()
    proof?: IProof | IProof[];
}