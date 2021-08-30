import { Constraints, Field, Optionality, Statuses } from '@sphereon/pe-models';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FieldEntity } from './fieldEntity';
import { HolderSubjectEntity } from './holderSubjectEntity';
import { StatusesEntity } from './statusesEntity';

@Entity({ name: 'Constraints' })
export class ConstraintsEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column({ default: null })
  limit_disclosure?: Optionality;

  @OneToOne(() => StatusesEntity, { cascade: true })
  @JoinColumn()
  statuses?: Statuses;

  @OneToMany(() => FieldEntity, (field) => field.hash, { cascade: true })
  fields?: Array<FieldEntity>;

  @Column({ default: null })
  subject_is_issuer?: Optionality;

  @OneToMany(() => HolderSubjectEntity, (holderSubject) => holderSubject.hash, { cascade: true })
  is_holder?: Array<HolderSubjectEntity>;

  @OneToMany(() => HolderSubjectEntity, (holderSubject) => holderSubject.hash, { cascade: true })
  same_subject?: Array<HolderSubjectEntity>;
}
