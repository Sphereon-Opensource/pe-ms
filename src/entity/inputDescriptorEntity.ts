import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';

import { ConstraintsEntity } from './constraintsEntity';
import { GroupEntity } from './groupEntity';
import { PresentationDefinitionEntity } from './presentationDefinitionEntity';
import { SchemaEntity } from './schemaEntity';

@Entity({ name: 'InputDescriptor' })
export class InputDescriptorEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column()
  //@ts-ignore
  id: string;

  @Column({ default: null })
  name?: string;

  @Column({ default: null })
  purpose?: string;

  @OneToMany(() => GroupEntity, group => group.hash, {cascade: true})
  group?: Array<GroupEntity>;

  @OneToMany(() => SchemaEntity, (schema) => schema.hash, { cascade: true })
  //@ts-ignore
  schema: Array<SchemaEntity>;

  @OneToOne(() => ConstraintsEntity, { cascade: true })
  @JoinColumn()
  constraints?: ConstraintsEntity;

  @ManyToOne(() => PresentationDefinitionEntity, (presentationDefinition) => presentationDefinition.hash)
  //@ts-ignore
  presentationDefinition: PresentationDefinitionEntity;
}
