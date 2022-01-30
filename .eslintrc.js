module.exports = {
  extends: ['react-app', 'react-app/jest'],
  ignorePatterns: ['config/', 'scripts/', 'build/'],
  rules: {
    '@typescript-eslint/no-unused-vars': [1]
  }
}
