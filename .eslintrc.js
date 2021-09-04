const commonRules = {
  // Override the setting in `eslint-config-airbnb`
  // https://github.com/airbnb/javascript/blob/f5c14cae2ff58000cead98290b8ec4b54dda2f14/packages/eslint-config-airbnb/rules/react-a11y.js#L121-L129
  'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
};

module.exports = {
  env: {
    browser: true,
  },
  // Extends the `eslint-config-airbnb` config.
  // https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v18.2.1/packages/eslint-config-airbnb
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],

  rules: {
    ...commonRules,
  },
  // By default, without `overrides` section, ESLint will not be applied on
  // non-JavaScript file (*.js).
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      // Use tsdoc plugin to check the documentation format.
      // https://github.com/microsoft/tsdoc/tree/1cabc7d644f76b657b3deba87e8d509c72b2812e/eslint-plugin
      plugins: ['tsdoc'],

      // Airbnb's ESLint config with TypeScript support.
      // https://github.com/iamturns/eslint-config-airbnb-typescript/tree/e9910fca83641377656106e17c15bf7735442627
      extends: ['airbnb-typescript', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'tsdoc/syntax': 'warn',
        ...commonRules,
      },
    },
  ],
};
