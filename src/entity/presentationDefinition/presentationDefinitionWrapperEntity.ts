import { PresentationDefinition} from '@sphereon/pe-models';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { CallbackEntity } from "../callbackEntity";
import { ChallengeEntity } from "../challengeEntity";

/**
 * A wrapper object for our presentation_definition. For
 */
@Entity('presentation_definition_wrapper')
export class PresentationDefinitionWrapperEntity {
  @ObjectIdColumn()
  // @ts-ignore
  _id: ObjectID;

  @Column()
  presentation_definition?: PresentationDefinition;

  @Column()
  // @ts-ignore
  id: string;

  @Column()
  // @ts-ignore
  comment: string;

  @Column()
  name?: string;

  @Column()
  purpose?: string;

  @Column()
  // @ts-ignore
  challenge: ChallengeEntity;

  // @ts-ignore
  callback: CallbackEntity;
}
