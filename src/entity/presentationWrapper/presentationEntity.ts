import { Presentation, Proof } from "@sphereon/pe-js";
import { Column } from "typeorm";

import { PresentationSubmissionEntity } from "./presentationSubmissionEntity";
import { VerifiableCredentialEntity } from "./verifiableCredentialEntity";

export class PresentationEntity implements Presentation {
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
    proof?: Proof | Proof[];
}