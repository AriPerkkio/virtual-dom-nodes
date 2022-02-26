/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
