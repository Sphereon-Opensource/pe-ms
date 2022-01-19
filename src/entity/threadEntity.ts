import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { ChallengeEntity } from './challengeEntity';

@Entity('thread')
export class ThreadEntity {
  @ObjectIdColumn({ name: '_id' })
  // @ts-ignore
  id: ObjectID;
  @Column()
  // @ts-ignore
  challenge: ChallengeEntity;
}
