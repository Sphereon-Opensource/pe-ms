import { IIssuer, IProof } from '@sphereon/pex';
import { ICredentialSubject } from '@sphereon/pex';
import { IsArray, IsDateString, IsDefined, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

import { CredentialStatusEntity } from './credentialStatusEntity';

export class VerifiableCredentialEntity {
  @Column()
  @IsDefined({ message: 'VerifiableCredential.@context must be provided' })
  @IsArray({ message: 'VerifiableCredential.@context must be an array' })
  '@context': string[];

  @Column()
  @IsNotEmpty({ message: 'VerifiableCredential.id is invalid' })
  //@ts-ignore
  id: string;

  @Column()
  @IsDefined({ message: 'VerifiableCredential.type must be provided' })
  @IsArray({ message: 'VerifiableCredential.type must be an array' })
  //@ts-ignore
  type: string[];

  @Column({ type: 'simple-json' })
  @IsDefined({ message: 'VerifiableCredential.credentialSubject must be provided' })
  //@ts-ignore
  credentialSubject: ICredentialSubject;

  @Column({ type: 'simple-json' })
  @IsDefined({ message: 'VerifiableCredential.issuer must be provided' })
  //@ts-ignore
  issuer: string | IIssuer;

  @Column()
  @IsDefined({ message: 'VerifiableCredential.issuanceDate must be provided' })
  @IsDateString(
    { strict: true },
    { message: 'VerifiableCredential.issuanceDate must be a valid ISO8601 date string or EPOCH' }
  )
  //@ts-ignore
  issuanceDate: string;

  @Column()
  @IsDateString(
    { strict: true },
    { message: 'VerifiableCredential.expirationDate must be a valid ISO8601 date string or EPOCH' }
  )
  expirationDate?: string;

  @Column(() => CredentialStatusEntity)
  credentialStatus?: CredentialStatusEntity;

  @Column()
  vc?: VerifiableCredentialEntity;

  @Column()
  //@ts-ignore
  proof?: IProof | IProof[];
}
