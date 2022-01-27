import { IPresentationDefinition } from '@sphereon/pex';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { CallbackEntity } from '../callbackEntity';
import { ChallengeEntity } from '../challengeEntity';

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
  presentation_definition: IPresentationDefinition;

  @Column()
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

  // @ts-ignore
  challenge: ChallengeEntity;

  // @ts-ignore
  thread: { id: ObjectID };

  @Column()
  @IsDefined({ message: 'PresentationDefinitionWrapper.callback must be provided' })
  // @ts-ignore
  callback: CallbackEntity;
}
