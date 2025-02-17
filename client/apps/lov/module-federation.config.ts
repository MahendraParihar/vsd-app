import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'lov',
  exposes: {
    './Module': 'apps/lov/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
