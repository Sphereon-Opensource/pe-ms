import {LdpObject} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class LdpObjectEntity implements LdpObject {

    @Column()
    proof_type: string[];

    constructor(proof_type: string[]) {
        this.proof_type = proof_type;
    }
}