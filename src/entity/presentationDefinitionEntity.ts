import { Format, InputDescriptor, PresentationDefinition, SubmissionRequirement } from '@sphereon/pe-models';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FormatEntity } from './formatEntity';
import { InputDescriptorEntity } from './inputDescriptorEntity';
import { SubmissionRequirementEntity } from './submissionRequirementEntity';

@Entity({ name: 'PresentationDefinition' })
export class PresentationDefinitionEntity implements PresentationDefinition {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column()
  //@ts-ignore
  id: string;

  @OneToMany(() => InputDescriptorEntity, (inputDescriptor) => inputDescriptor.id, { cascade: true })
  //@ts-ignore
  input_descriptors: InputDescriptorEntity[];

  @Column({ default: null })
  name?: string;

  @Column({ default: null })
  purpose?: string;

  @OneToOne(() => FormatEntity, { cascade: true })
  @JoinColumn()
  format?: FormatEntity;

  @OneToMany(() => SubmissionRequirementEntity, (submissionRequirement) => submissionRequirement.hash, {
    cascade: true,
  })
  submission_requirements?: SubmissionRequirementEntity[];
}
