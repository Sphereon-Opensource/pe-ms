import { Challenge } from '@sphereon/pe-models';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from './presentationDefinitionWrapperEntity';

@Entity({ name: 'Challenge' })
export class ChallengeEntity implements Challenge {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  @Column()
  holder?: string;
  @Column()
  //@ts-ignore
  token: string;

  @OneToOne(() => PresentationDefinitionWrapperEntity)
  //@ts-ignore
  presentationDefinitionWrapperEntity: PresentationDefinitionWrapperEntity;
}
