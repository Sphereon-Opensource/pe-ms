import { IsDefined, IsNotEmpty } from "class-validator";
import {Column, Entity, Index, ObjectID, ObjectIdColumn} from 'typeorm';

import { CallbackEntity } from '../callbackEntity';
import { ChallengeEntity } from '../challengeEntity';
import {ThreadEntity} from "../threadEntity";


@Entity('presentation_wrapper')
export class PresentationWrapperEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  @Column()
  @IsNotEmpty({ message: 'PresentationWrapper.pdId is invalid' })
  // @ts-ignore
  pdId: string;

  @Column()
  @IsDefined({ message: 'PresentationWrapper.challenge must be provided' })
  // @ts-ignore
  challenge: ChallengeEntity;

  @Column()
  @IsDefined({ message: 'PresentationWrapper.presentation must be provided' })
  // @ts-ignore
  presentation: PresentationEntity;

  @Column()
  @IsDefined({ message: 'PresentationWrapper.thread must be provided' })
  // @ts-ignore
  thread: ThreadEntity

  @Column()
  @Index({ unique: true })
  @IsNotEmpty({ message: 'PresentationDefinitionWrapper.id is invalid' })
  // @ts-ignore
  id: string;

  @Column()
  @IsNotEmpty({ message: 'PresentationDefinitionWrapper.comment is invalid' })
      // @ts-ignore
  comment: string;

  @Column()
  name?: string;

  @Column()
  purpose?: string;

  @Column()
  @IsDefined({ message: 'PresentationWrapper.callback must be provided' })
  // @ts-ignore
  callback: CallbackEntity;
}
