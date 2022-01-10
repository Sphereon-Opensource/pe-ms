import { Challenge } from '@sphereon/pex-models';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class ChallengeEntity implements Challenge {
  @Column()
  holder?: string;
  @Column()
  @IsNotEmpty({ message: 'Challenge.token is invalid'})
  token: string;

  constructor(token: string, holder?: string) {
    this.token = token;
    this.holder = holder;
  }
}
