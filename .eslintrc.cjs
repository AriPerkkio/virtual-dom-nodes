/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['src/**'],
            plugins: ['import'],
            rules: {
                // Require specifying extensions due to https://github.com/microsoft/TypeScript/issues/16577
                'import/extensions': ['error', 'always'],
            },
        },
        {
            files: ['test/**'],
            rules: {
                '@typescript-eslint/no-non-null-assertion': 'off',
            },
        },
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
};
