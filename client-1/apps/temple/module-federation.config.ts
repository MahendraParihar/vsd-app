import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'temple',
  exposes: {
    './Module': 'apps/temple/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
