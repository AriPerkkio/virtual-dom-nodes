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
    ignorePatterns: ['dist', '.eslintrc.js'],
};
