module.exports = {
  setupFiles: ['./tests/helpers/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress'],
  testMatch: ['<rootDir>/**/*.(spec|test).{js,jsx}'],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': 'identity-obj-proxy',
  },
};
