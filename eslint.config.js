import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'
export default defineConfig([
  globalIgnores(['dist', '.astro', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    plugins: { react },
    rules: { 'react/jsx-uses-vars': 'error', 'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }] },
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
