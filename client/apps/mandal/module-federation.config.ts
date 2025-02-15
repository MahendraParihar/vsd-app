import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'mandal',
  exposes: {
    './Module': 'apps/mandal/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
