module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "babel-eslint",
  plugins: [
    "cypress",
    "jest",
    "react",
    // "prettier"
  ],
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  globals: {
    cy: true,
  },
};
