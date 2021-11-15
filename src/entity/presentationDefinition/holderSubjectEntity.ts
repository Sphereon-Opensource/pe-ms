import {HolderSubject, Optionality} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class HolderSubjectEntity implements HolderSubject {

    @Column()
    directive: Optionality;
    @Column()
    field_id: string[];

    constructor(directive: Optionality, field_id: string[]) {
        this.directive = directive;
        this.field_id = field_id;
    }
}