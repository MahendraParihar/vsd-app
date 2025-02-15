import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'job',
  exposes: {
    './Module': 'apps/job/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
