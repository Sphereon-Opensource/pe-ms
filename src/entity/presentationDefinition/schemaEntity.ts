import {Schema} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class SchemaEntity implements Schema {

    @Column()
    required?: boolean;
    @Column()
    uri: string;

    constructor(uri: string, required?: boolean) {
        this.required = required;
        this.uri = uri;
    }
}