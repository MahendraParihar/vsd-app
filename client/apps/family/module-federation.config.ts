import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'family',
  exposes: {
    './Module': 'apps/family/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
