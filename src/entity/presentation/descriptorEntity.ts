import { Descriptor } from '@sphereon/pe-models';
import { Column } from 'typeorm';

export class DescriptorEntity implements Descriptor {
  @Column()
  format: string;
  @Column()
  id: string;
  @Column()
  path: string;
  @Column()
  path_nested?: DescriptorEntity;

  constructor(id: string, format: string, path: string, path_nested?: DescriptorEntity) {
    this.id = id;
    this.format = format;
    this.path = path;
    this.path_nested = path_nested;
  }
}
