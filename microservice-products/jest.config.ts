module.exports = {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/filters',
    '!<rootDir>/src/interceptors',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.dto.ts',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
