import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
