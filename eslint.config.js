import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

// Flat config (ESLint 10). Standard Vite + React setup: JS recommended rules,
// React Hooks rules, react-refresh (Fast Refresh) guardrails, and
// eslint-config-prettier last to disable any formatting rules that would
// clash with Prettier (Prettier owns formatting, ESLint owns correctness).
export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Allow intentionally-unused capitalised/underscore names (e.g. imported
      // components kept for clarity, destructured throwaways).
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Config files run in Node, not the browser (need `process`, etc.).
  {
    files: ['**/*.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  // Entry file: it renders the app rather than exporting a component, so the
  // Fast Refresh "only export components" guard doesn't apply.
  {
    files: ['src/main.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  prettier,
]
