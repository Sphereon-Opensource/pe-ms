import { CredentialStatus } from "@sphereon/pe-js/dist/main/lib/types/SSI.types";
import { Column } from "typeorm";

export class CredentialStatusEntity implements CredentialStatus {
    @Column()
    //@ts-ignore
    id: string;
    @Column()
    //@ts-ignore
    type: string;
}