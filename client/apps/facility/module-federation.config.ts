import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'facility',
  exposes: {
    './Module': 'apps/facility/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
