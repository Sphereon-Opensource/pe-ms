import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LdpObjectEntity } from './LdpObjectEntity';

@Entity({ name: 'ProofType' })
export class ProofTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column()
  //@ts-ignore
  proof_type: string;

  @ManyToOne(() => LdpObjectEntity, (lpdObject) => lpdObject.hash)
  //@ts-ignore
  lpdObject: LdpObjectEntity;
}
