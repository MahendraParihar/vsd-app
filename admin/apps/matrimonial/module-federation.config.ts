import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'matrimonial',
  exposes: {
    './Module': 'apps/matrimonial/src/app/remote-entry/entry.module.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
