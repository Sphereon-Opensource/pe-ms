import { PresentationDefinition } from "@sphereon/pe-models";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

import {FormatEntity} from "./formatEntity";
import {InputDescriptorEntity} from "./inputDescriptorEntity";
import {SubmissionRequirementEntity} from "./submissionRequirementEntity";

@Entity('presentation_definition')
export class PresentationDefinitionEntity implements PresentationDefinition {

    @ObjectIdColumn()
    // @ts-ignore
    _id: ObjectID;

    @Column(type => FormatEntity)
    format?: FormatEntity;

    @Column()
    // @ts-ignore
    id: string;

    @Column(type => InputDescriptorEntity)
    // @ts-ignore
    input_descriptors: InputDescriptorEntity[];

    @Column()
    name?: string;

    @Column()
    purpose?: string;

    @Column(type => SubmissionRequirementEntity)
    submission_requirements?: SubmissionRequirementEntity[];
}