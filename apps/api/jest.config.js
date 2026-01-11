module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['./src/__tests__/setup.js'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/__tests__/**',
        '!src/seed.js'
    ],
    testTimeout: 30000,
    verbose: true
};
