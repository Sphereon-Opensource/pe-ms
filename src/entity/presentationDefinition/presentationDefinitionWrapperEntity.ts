import { IsDefined, IsNotEmpty } from "class-validator";
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { IPresentationDefinition } from "@sphereon/pex";
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { CallbackEntity } from "../callbackEntity";
import { ChallengeEntity } from "../challengeEntity";
import { ThreadEntity } from "../threadEntity";

/**
 * A wrapper object for our presentation_definition. For
 */
@Entity('presentation_definition_wrapper')
export class PresentationDefinitionWrapperEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  @Column()
  @IsDefined({ message: 'PresentationDefinitionWrapper.presentation_definition must be provided' })
  // @ts-ignore
  presentation_definition: IPresentationDefinition

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
  //@IsDefined({ message: 'PresentationDefinitionWrapper.challenge must be provided' })
  // @ts-ignore
  challenge: ChallengeEntity;

  @Column()
  @IsDefined({ message: 'PresentationDefinitionWrapper.thread must be provided' })
  // @ts-ignore
  thread: ThreadEntity;

  @Column()
  @IsDefined({ message: 'PresentationDefinitionWrapper.callback must be provided' })
  // @ts-ignore
  callback: CallbackEntity;
}
