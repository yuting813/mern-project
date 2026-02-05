module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off', // Allow console.log for server-side logging
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'node/no-unpublished-require': 'off', // Allow requiring devDependencies like nodemon
  },
  ignorePatterns: ['client/', 'node_modules/', 'build/', 'dist/', '*.min.js'], // Client has its own ESLint config
};
