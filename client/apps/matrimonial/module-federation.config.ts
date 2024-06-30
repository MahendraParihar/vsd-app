import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'matrimonial',
  exposes: {
    './Module': 'apps/matrimonial/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
