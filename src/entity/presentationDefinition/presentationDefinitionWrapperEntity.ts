import { PresentationDefinition } from '@sphereon/pe-models';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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
}
