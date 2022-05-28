module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "react-app",
    "react-app/jest",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-redux/recommended",
    "plugin:cypress/recommended",
    "prettier",
  ],
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
