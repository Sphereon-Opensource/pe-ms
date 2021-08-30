import { Callback, Challenge, PresentationDefinition, Thread } from '@sphereon/pe-models';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CallbackEntity } from './callbackEntity';
import { ChallengeEntity } from './challengeEntity';
import { PresentationDefinitionEntity } from './presentationDefinitionEntity';
import { ThreadEntity } from './threadEntity';

@Entity({ name: 'PresentationDefinitionWrapper' })
export class PresentationDefinitionWrapperEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;
  @OneToOne(() => ThreadEntity)
  @JoinColumn()
  //@ts-ignore
  thread: ThreadEntity;
  @OneToOne(() => PresentationDefinitionEntity, { cascade: true })
  @JoinColumn()
  //@ts-ignore
  presentation_definition: PresentationDefinition;
  @OneToOne(() => ChallengeEntity, { cascade: true })
  @JoinColumn()
  //@ts-ignore
  challenge: Challenge;
  @OneToOne(() => CallbackEntity, { cascade: true })
  @JoinColumn()
  //@ts-ignore
  callback: Callback;
}
