import { LdpObject } from '@sphereon/pe-models';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProofTypeEntity } from './proofTypeEntity';

@Entity({ name: 'LdpObject' })
export class LdpObjectEntity implements LdpObject {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @OneToMany(() => ProofTypeEntity, (proofType) => proofType.hash, { cascade: true })
  //@ts-ignore
  proof_type: ProofTypeEntity[];
}
