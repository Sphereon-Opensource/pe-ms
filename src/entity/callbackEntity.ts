import { Callback } from '@sphereon/pex-models';
import { IsUrl } from 'class-validator';
import { Column } from 'typeorm';

export class CallbackEntity implements Callback {
  @Column()
  @IsUrl({ message: 'Callback.url is not valid.' })
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
