module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    curly: 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-console': [
          'warn',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
      },
    },
  ],
};
