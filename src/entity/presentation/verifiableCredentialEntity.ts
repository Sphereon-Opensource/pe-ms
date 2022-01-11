import {
    IIssuer, IProof
} from "@sphereon/pex";
import { ICredentialSubject } from "@sphereon/pex";
import { Column } from "typeorm";

import { CredentialStatusEntity } from "./credentialStatusEntity";

export class VerifiableCredentialEntity {
    @Column()
    '@context': string[];
    @Column()
    //@ts-ignore
    id: string;
    @Column()
    //@ts-ignore
    type: string[];
    @Column({ type: 'simple-json' })
    //@ts-ignore
    credentialSubject: ICredentialSubject
    @Column({ type: 'simple-json' })
    //@ts-ignore
    issuer: string | IIssuer;
    @Column()
    //@ts-ignore
    issuanceDate: string;
    @Column()
    expirationDate?: string;
    @Column(() => CredentialStatusEntity)
    credentialStatus?: CredentialStatusEntity
    @Column()
    vc?: VerifiableCredentialEntity
    @Column()
    //@ts-ignore
    proof?: IProof | IProof[];
}