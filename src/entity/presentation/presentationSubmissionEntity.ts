import { PresentationSubmission } from '@sphereon/pex-models';
import { Column } from 'typeorm';

import { DescriptorEntity } from './descriptorEntity';

export class PresentationSubmissionEntity implements PresentationSubmission {
  @Column()
  definition_id: string;
  @Column((type) => DescriptorEntity)
  descriptor_map: DescriptorEntity[];
  @Column()
  id: string;

  constructor(id: string, definition_id: string, descriptor_map: DescriptorEntity[]) {
    this.id = id;
    this.definition_id = definition_id;
    this.descriptor_map = descriptor_map;
  }
}
