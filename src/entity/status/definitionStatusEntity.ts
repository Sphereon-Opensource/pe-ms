import { ExchangeStatus } from '@sphereon/pex-models';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { PresentationDefinitionStatus } from '../../types/presentationDefinitionStatus';
import { ChallengeEntity } from '../challengeEntity';

@Entity('definition_status')
export class DefinitionStatusEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  // @ts-ignore
  thread: { id: ObjectID };

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

  // @ts-ignore
  challenge: ChallengeEntity;
}
