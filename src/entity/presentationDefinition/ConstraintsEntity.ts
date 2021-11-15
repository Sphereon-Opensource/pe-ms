import {Constraints, Optionality} from "@sphereon/pe-models";
import {Statuses} from "@sphereon/pe-models/model/statuses";
import {Column} from "typeorm";

import {FieldEntity} from "./FieldEntity";
import {HolderSubjectEntity} from "./holderSubjectEntity";

export class ConstraintsEntity implements Constraints {

    @Column()
    limit_disclosure?: Optionality;
    @Column()
    statuses?: Statuses;
    @Column(type => FieldEntity)
    fields?: FieldEntity[];
    @Column()
    subject_is_issuer?: Optionality;
    @Column(type => HolderSubjectEntity)
    is_holder?: HolderSubjectEntity[];
    @Column(type => HolderSubjectEntity)
    same_subject?: HolderSubjectEntity[];

    constructor(limit_disclosure?: Optionality, statuses?: Statuses, fields?: FieldEntity[], subject_is_issuer?: Optionality, is_holder?: HolderSubjectEntity[], same_subject?: HolderSubjectEntity[]) {
        this.limit_disclosure = limit_disclosure;
        this.statuses = statuses;
        this.fields = fields;
        this.subject_is_issuer = subject_is_issuer;
        this.is_holder = is_holder;
        this.same_subject = same_subject;
    }
}