import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import tailwindCssPlugin from 'eslint-plugin-tailwindcss';

export default [
    eslint.configs.recommended,
    tsEslint.configs.eslintRecommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    ...tailwindCssPlugin.configs['flat/recommended'],

    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    {
        ignores: ['**/*.json', '**/*.js', '**/*.cjs', '**/*.mjs', '.next/**/*'],
    },

    {
        rules: {
            'react/display-name': 'off',

            'tailwindcss/no-custom-classname': 'error',

            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
        },
    },

    {
        files: ['components/ui/**/*.*'],
        rules: {
            'react/prop-types': 'off',
        },
    },
];
