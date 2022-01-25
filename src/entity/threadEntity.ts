import { IsDefined, IsMongoId, ValidateNested } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { ChallengeEntity } from './challengeEntity';

@Entity('thread')
export class ThreadEntity {
  @ObjectIdColumn({ name: '_id' })
  @IsMongoId({ message: 'Invalid thread id' })
  // @ts-ignore
  id: ObjectID;
  @Column()
  @IsDefined({ message: 'Thread.challenge must be provided' })
  @ValidateNested()
  // @ts-ignore
  challenge: ChallengeEntity;
}
