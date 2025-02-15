import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'news',
  exposes: {
    './Module': 'apps/news/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
