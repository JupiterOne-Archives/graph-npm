import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

export { Polly } from '@pollyjs/core';

export function setupPolly(recordingsDir: string, name: string): Polly {
  return new Polly(name, {
    adapters: ['node-http'],
    persister: FSPersister,
    persisterOptions: {
      FSPersister: {
        recordingsDir: `${recordingsDir}/__recordings__`,
      },
    },
    matchRequestsBy: {
      headers: false,
      body: false,
    },
  });
}
