import { Statuses } from '@sphereon/pe-models';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { PdStatusEntity } from './pdStatusEntity';

@Entity({ name: 'Statuses' })
export class StatusesEntity implements Statuses {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  active?: PdStatusEntity;
  suspended?: PdStatusEntity;
  revoked?: PdStatusEntity;
}
