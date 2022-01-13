import { ExchangeStatus } from '@sphereon/pex-models';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { PresentationDefinitionStatus } from '../../types/presentationDefinitionStatus';
import { ChallengeEntity } from '../challengeEntity';
import { ThreadEntity } from '../threadEntity';

@Entity('definition_status')
export class DefinitionStatusEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  @Column()
  @IsDefined({ message: 'Thread must be provided' })
  // @ts-ignore
  thread: ThreadEntity;

  @Column()
  @IsNotEmpty({ message: 'Definition_id is invalid' })
  // @ts-ignore
  definition_id: string;

  @Column({ type: 'enum', enum: PresentationDefinitionStatus })
  @IsEnum(PresentationDefinitionStatus, { message: 'Presentation definition status is invalid' })
  // @ts-ignore
  status: ExchangeStatus;

  @Column({ default: undefined })
  message?: string;

  @Column()
  @IsDefined({ message: 'Challenge must be provided' })
  // @ts-ignore
  challenge: ChallengeEntity;
}
