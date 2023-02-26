
const testPathIgnorePatterns = { testPathIgnorePatterns: ["<rootDir>/src/js/__tests__/sample/"]};


module.exports = {
  roots: [
    "<rootDir>/src/js"
  ],
  testMatch: [
    // "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
   ...testPathIgnorePatterns,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    // "^.+node_modules/vue/.+\\.(j|t)sx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/js/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
 // https://github.com/vuejs/vue-jest/issues/479
 // https://jestjs.io/docs/configuration#testenvironmentoptions-object
};
