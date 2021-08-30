import { Callback } from '@sphereon/pe-models';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PresentationDefinitionWrapperEntity } from './presentationDefinitionWrapperEntity';

@Entity({ name: 'Callback' })
export class CallbackEntity implements Callback {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column()
  //@ts-ignore
  url: string;

  @OneToOne(() => PresentationDefinitionWrapperEntity)
  //@ts-ignore
  presentationDefinitionWrapperEntity: PresentationDefinitionWrapper;
}
