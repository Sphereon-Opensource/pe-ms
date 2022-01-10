import { ICredentialStatus } from "@sphereon/pex";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CredentialStatusEntity implements ICredentialStatus {
    @Column()
    @IsNotEmpty({ message: 'CredentialStatus.id must be provided' })
    //@ts-ignore
    id: string;
    @Column()
    @IsNotEmpty({ message: 'CredentialStatus.type must be provided' })
    //@ts-ignore
    type: string;
}