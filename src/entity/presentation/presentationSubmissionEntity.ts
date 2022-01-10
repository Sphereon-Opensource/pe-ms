import { PresentationSubmission } from '@sphereon/pex-models';
import { IsArray, IsDefined, IsNotEmpty } from "class-validator";
import { Column } from 'typeorm';

import { DescriptorEntity } from './descriptorEntity';


export class PresentationSubmissionEntity implements PresentationSubmission {
  @Column()
  @IsNotEmpty({ message: 'PresentationSubmission.definition_id is invalid' })
  definition_id: string;
  @Column((type) => DescriptorEntity)
  @IsDefined({ message: 'PresentationSubmission.descriptor_map must be provided' })
  @IsArray({ message: 'PresentationSubmission.descriptor_map must be an array' })
  descriptor_map: DescriptorEntity[];
  @Column()
  @IsNotEmpty({ message: 'PresentationSubmission.id is invalid' })
  id: string;

  constructor(id: string, definition_id: string, descriptor_map: DescriptorEntity[]) {
    this.id = id;
    this.definition_id = definition_id;
    this.descriptor_map = descriptor_map;
  }
}
