import { createAgent, IDataStore, IDIDManager, IKeyManager, IResolver } from '@veramo/core';
// Core identity manager plugin
import { DIDStore, Entities, IDataStoreORM, KeyStore } from '@veramo/data-store';
import { DIDManager } from '@veramo/did-manager';
// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web';
// Core key manager plugin
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { KeyManager } from '@veramo/key-manager';
// Custom key management system for RN
import { KeyManagementSystem } from '@veramo/kms-local';
// Custom resolvers
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { createConnection } from 'typeorm';
import { getResolver as webDidResolver } from 'web-did-resolver';

const INFURA_PROJECT_ID = 'pe-js';

const dbConnection = createConnection({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'PE_MS',
  synchronize: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
});

export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr:rinkeby',
      providers: {
        'did:ethr:rinkeby': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'rinkeby',
          rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
        }),
        'did:web': new WebDIDProvider({
          defaultKms: 'local',
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
      }),
    }),
  ],
});
