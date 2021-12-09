import { Challenge } from '@sphereon/pe-models';
import { Column } from 'typeorm';

export class ChallengeEntity implements Challenge {
  @Column()
  holder?: string;
  @Column()
  token: string;

  constructor(token: string, holder?: string) {
    this.token = token;
    this.holder = holder;
  }
}
