import { Descriptor } from '@sphereon/pex-models';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class DescriptorEntity implements Descriptor {
  @Column()
  @IsNotEmpty({ message: 'Descriptor.format is invalid' })
  format: string;
  @Column()
  @IsNotEmpty({ message: 'Descriptor.id is invalid' })
  id: string;
  @Column()
  @IsNotEmpty({ message: 'Descriptor.path is invalid' })
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
