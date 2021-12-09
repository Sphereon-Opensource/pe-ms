import { Callback } from '@sphereon/pe-models';
import { Column } from 'typeorm';

export class CallbackEntity implements Callback {
  @Column()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
