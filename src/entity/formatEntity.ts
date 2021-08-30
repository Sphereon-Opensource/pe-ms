import { Format, JwtObject, LdpObject } from '@sphereon/pe-models';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LdpObjectEntity } from './LdpObjectEntity';
import { JwtObjectEntity } from './jwtObjectEntity';

@Entity({ name: 'Format' })
export class FormatEntity implements Format {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  @OneToOne(() => JwtObjectEntity, { cascade: true })
  @JoinColumn()
  jwt?: JwtObject;
  @OneToOne(() => JwtObjectEntity, { cascade: true })
  @JoinColumn()
  jwt_vc?: JwtObject;
  @OneToOne(() => JwtObjectEntity, { cascade: true })
  @JoinColumn()
  jwt_vp?: JwtObject;
  @OneToOne(() => LdpObjectEntity, { cascade: true })
  @JoinColumn()
  ldp?: LdpObject;
  @OneToOne(() => LdpObjectEntity, { cascade: true })
  @JoinColumn()
  ldp_vc?: LdpObject;
  @OneToOne(() => LdpObjectEntity, { cascade: true })
  @JoinColumn()
  ldp_vp?: LdpObject;
}
