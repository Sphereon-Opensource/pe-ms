import { PresentationSubmission, Rules, SubmissionRequirement } from '@sphereon/pe-models';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SubmissionRequirement' })
export class SubmissionRequirementEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private _hash!: string;
  private _name?: string;
  private _purpose?: string;
  @Column({ type: 'enum', enum: Rules })
  private _rule!: Rules;
  private _count?: number;
  private _min?: number;
  private _max?: number;
  private _from?: string;
  @ManyToOne(() => SubmissionRequirementEntity, (submissionRequirement) => submissionRequirement.hash)
  private _from_nested?: Array<SubmissionRequirement>;

  constructor(...submissionRequirements: SubmissionRequirement[]) {
    super();
    if (submissionRequirements.length === 1) {
      this._name = submissionRequirements[0].name;
      this._purpose = submissionRequirements[0].purpose;
      this._rule = submissionRequirements[0].rule;
      this._count = submissionRequirements[0].count;
      this._min = submissionRequirements[0].min;
      this._max = submissionRequirements[0].max;
      this._from = submissionRequirements[0].from;
      this._from_nested = submissionRequirements[0].from_nested;
    }
  }

  get hash() {
    return this._hash;
  }

  get name() {
    return this._name;
  }

  get purpose() {
    return this._purpose;
  }

  get rule() {
    return this._rule;
  }

  get count() {
    return this._count;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  get from() {
    return this._from;
  }

  get from_nested() {
    return this._from_nested;
  }
}
