import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'event',
  exposes: {
    './Module': 'apps/event/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
