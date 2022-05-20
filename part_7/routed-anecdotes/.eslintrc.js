module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "jsx-a11y/anchor-is-valid": 0,
    "no-console": 0,
    "no-param-reassign": ["error", { "props": false }]
  },
}
