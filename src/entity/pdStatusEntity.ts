import { Directives, PdStatus } from '@sphereon/pe-models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PdStatus' })
export class PdStatusEntity implements PdStatus {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  @Column({ type: 'enum', enum: Directives })
  directive?: Directives;
}
