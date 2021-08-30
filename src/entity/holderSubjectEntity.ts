import { HolderSubject, Optionality } from '@sphereon/pe-models';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ConstraintsEntity } from './constraintsEntity';
import { FieldIdEntity } from './fieldIdEntity';

@Entity({ name: 'HolderSubject' })
export class HolderSubjectEntity implements HolderSubject {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @OneToMany(() => FieldIdEntity, fieldId => fieldId.hash, {cascade: true})
  //@ts-ignore
  field_id: Array<FieldIdEntity>;

  @Column()
  //@ts-ignore
  directive: Optionality;

  @ManyToOne(() => ConstraintsEntity, (constraint) => constraint.hash)
  //@ts-ignore
  constraints: ConstraintsEntity;
}
