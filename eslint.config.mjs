import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', 'output/**'] },
  {
    files: ['**/*.{js,mjs}'],
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.browser, ...globals.node }, sourceType: 'module', ecmaVersion: 'latest' },
  },
];
