module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "cypress"],
  rules: {
    "no-unused-vars": 0,
    "react/jsx-filename-extension": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/prop-types": 0,
    "no-console": 0,
    "no-shadow": 0,
    "react/react-in-jsx-scope": 0,
    "react/forbid-prop-types": 0,
  },
}
