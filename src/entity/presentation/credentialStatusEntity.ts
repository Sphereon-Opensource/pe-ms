import { ICredentialStatus } from "@sphereon/pex";
import { Column } from "typeorm";

export class CredentialStatusEntity implements ICredentialStatus {
    @Column()
    //@ts-ignore
    id: string;
    @Column()
    //@ts-ignore
    type: string;
}