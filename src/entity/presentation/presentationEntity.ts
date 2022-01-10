import { IPresentation, IProof } from "@sphereon/pex";
import { IsArray, IsDefined } from "class-validator";
import { Column } from "typeorm";

import { PresentationSubmissionEntity } from "./presentationSubmissionEntity";
import { VerifiableCredentialEntity } from "./verifiableCredentialEntity";


export class PresentationEntity implements IPresentation {
    @Column()
    @IsDefined({ message: 'Presentation.@context must be provided' })
    @IsArray({ message: 'Presentation.@context must be an array' })
    '@context': string[];
    @Column()
    @IsDefined({ message: 'Presentation.type must be provided' })
    @IsArray({ message: 'Presentation.type must be an array' })
    //@ts-ignore
    type: string[];
    @Column(() => VerifiableCredentialEntity)
    @IsDefined({ message: 'Presentation.verifiableCredential must be provided' })
    @IsArray({ message: 'Presentation.verifiableCredential must be an array' })
    //@ts-ignore
    verifiableCredential: VerifiableCredentialEntity[];
    @Column(() => PresentationSubmissionEntity)
    presentation_submission?: PresentationSubmissionEntity;
    @Column()
    holder?: string;
    @Column()
    proof?: IProof | IProof[];
}