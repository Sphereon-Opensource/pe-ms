import {Rules, SubmissionRequirement} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class SubmissionRequirementEntity implements SubmissionRequirement {
    @Column()
    count?: number;
    @Column()
    from?: string;
    @Column()
    from_nested?: SubmissionRequirementEntity[];
    @Column()
    max?: number;
    @Column()
    min?: number;
    @Column()
    name?: string;
    @Column()
    purpose?: string;
    @Column()
    rule: Rules;

    constructor(rule: Rules, count?: number, from?: string, from_nested?: SubmissionRequirementEntity[], max?: number, min?: number, name?: string, purpose?: string) {
        this.count = count;
        this.from = from;
        this.from_nested = from_nested;
        this.max = max;
        this.min = min;
        this.name = name;
        this.purpose = purpose;
        this.rule = rule;
    }
}