import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'member',
  exposes: {
    './Module': 'apps/member/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
