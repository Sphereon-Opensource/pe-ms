import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { CallbackEntity } from '../callbackEntity';
import { ChallengeEntity } from '../challengeEntity';

@Entity('presentation_wrapper')
export class PresentationWrapperEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;
  @Column()
  // @ts-ignore
  callback: CallbackEntity;
  @Column()
  // @ts-ignore
  challenge: ChallengeEntity;
  @Column()
  // @ts-ignore
  presentation: PresentationEntity
}
