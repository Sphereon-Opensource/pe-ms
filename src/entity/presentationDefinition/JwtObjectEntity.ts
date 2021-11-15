import {JwtObject} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class JwtObjectEntity implements JwtObject {

    @Column()
    alg: string[];

    constructor(alg: string[]) {
        this.alg = alg;
    }
}