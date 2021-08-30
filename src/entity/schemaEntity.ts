import { Schema } from '@sphereon/pe-models';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { InputDescriptorEntity } from './inputDescriptorEntity';

@Entity({ name: 'Schema' })
export class SchemaEntity implements Schema {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column({default: null})
  //@ts-ignore
  uri: string;

  @Column({default: null})
  required?: boolean;

  @ManyToOne(() => InputDescriptorEntity, inputDescriptor => inputDescriptor.hash)
  //@ts-ignore
  inputDescriptor: InputDescriptorEntity;
}
