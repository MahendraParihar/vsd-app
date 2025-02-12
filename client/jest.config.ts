import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.base.json',
      },
    ],
  },
  transformIgnorePatterns: ['./shared-library/dist/'],
});
