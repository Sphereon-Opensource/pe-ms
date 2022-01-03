import {
    Issuer, Proof
} from "@sphereon/pe-js/dist/main/lib/types/SSI.types";
import { CredentialSubject } from "@sphereon/pe-js/dist/module";
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
    credentialSubject: CredentialSubject
    @Column({ type: 'simple-json' })
    //@ts-ignore
    issuer: string | Issuer;
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
    proof?: Proof | Proof[];
}