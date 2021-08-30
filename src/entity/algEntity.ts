import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { JwtObjectEntity } from './jwtObjectEntity';

@Entity({ name: 'Alg' })
export class AlgEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  @Column()
  //@ts-ignore
  alg: string;
  @ManyToOne(() => JwtObjectEntity, (jwtObject) => jwtObject.hash)
  //@ts-ignore
  jwtObject: JwtObjectEntity;
}
