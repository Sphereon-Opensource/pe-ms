import { ExchangeStatus, PresentationStatus } from '@sphereon/pex-models';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { ChallengeEntity } from '../challengeEntity';

@Entity('presentation_status')
export class PresentationStatusEntity implements PresentationStatus {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  // @ts-ignore
  thread: { id: ObjectID };

  @Column()
  @IsNotEmpty({ message: 'Presentation_id is invalid' })
  // @ts-ignore
  presentation_id: string;

  @Column({ type: 'enum', enum: ExchangeStatus })
  @IsEnum(ExchangeStatus, { message: 'Presentation status is invalid' })
  // @ts-ignore
  status: ExchangeStatus;

  @Column({ default: undefined })
  message?: string;

  // @ts-ignore
  challenge: ChallengeEntity;
}
