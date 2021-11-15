import {Field, Optionality} from "@sphereon/pe-models";
import {Column} from "typeorm";

import {FilterEntity} from "./filterEntity";

export class FieldEntity implements Field {
    
    @Column()
    id?: string;
    @Column()
    path?: string[];
    @Column()
    purpose?: string;
    @Column(type => FilterEntity)
    filter?: FilterEntity;
    @Column()
    predicate?: Optionality;

    constructor(id?: string, path?: string[], purpose?: string, filter?: FilterEntity, predicate?: Optionality) {
        this.id = id;
        this.path = path;
        this.purpose = purpose;
        this.filter = filter;
        this.predicate = predicate;
    }
}