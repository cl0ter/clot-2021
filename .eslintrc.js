module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'semi': [1, 'never'],
    '@typescript-eslint/no-unused-vars': [0]
  },
  ignorePatterns: ['config/', 'scripts/', 'build/']
}
