/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    /*
     * ESM requires ".js" extensions in import statements. Since tsc output
     * doesn't add these, we need to add them in source code even when importing
     * ".ts" files. ts-jest doesn't understand these. Strip extensions from all
     * local ".js" imports, so that final import ends up loading the ".ts" file.
     */
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};

export default config;
