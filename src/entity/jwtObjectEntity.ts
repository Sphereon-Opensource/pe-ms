import { JwtObject } from '@sphereon/pe-models';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AlgEntity } from './algEntity';

@Entity({ name: 'JwtObject' })
export class JwtObjectEntity implements JwtObject {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @OneToMany(() => AlgEntity, (alg) => alg.hash, { cascade: true })
  //@ts-ignore
  alg: AlgEntity[];
}
