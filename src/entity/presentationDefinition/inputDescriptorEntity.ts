import {InputDescriptor} from "@sphereon/pe-models";
import {Column} from "typeorm";

import {ConstraintsEntity} from "./ConstraintsEntity";
import {SchemaEntity} from "./schemaEntity";

export class InputDescriptorEntity implements InputDescriptor {
    
    @Column()
    constraints?: ConstraintsEntity;
    @Column()
    group?: string[];
    @Column()
    id: string;
    @Column()
    name?: string;
    @Column()
    purpose?: string;
    @Column()
    schema: SchemaEntity[];

    constructor(id: string, schema: SchemaEntity[], constraints?: ConstraintsEntity, group?: string[], name?: string, purpose?: string) {
        this.constraints = constraints;
        this.group = group;
        this.id = id;
        this.name = name;
        this.purpose = purpose;
        this.schema = schema;
    }
}