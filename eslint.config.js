import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**'] },

  // 기본 JS 권장 규칙
  eslint.configs.recommended,

  // 기본 TS 권장 규칙(typed linting 아님)
  ...tseslint.configs.recommended,

  // 브라우저/노드 전역 (모노레포라 넉넉히)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },

  // React 기본 권장(Flat Config)
  // 참고: [eslint-plugin-react 문서](https://github.com/jsx-eslint/eslint-plugin-react)
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat['jsx-runtime'],
  },

  // Hooks 권장
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  // Prettier와 충돌 규칙 off (항상 마지막)
  prettier,
);