if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

const { paths, baseUrl } = require('./tsconfig.json').compilerOptions;
const { pathsToModuleNameMapper } = require('ts-jest');
module.exports = {
  modulePathIgnorePatterns: ['dist'],
  roots: ['<rootDir>'],
  modulePaths: [baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
    '^lodash-es$': 'lodash'
  },
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-preset-angular/build/serializers/no-ng-attributes',
    '<rootDir>/node_modules/jest-preset-angular/build/serializers/ng-snapshot',
    '<rootDir>/node_modules/jest-preset-angular/build/serializers/html-comment'
  ]
};
