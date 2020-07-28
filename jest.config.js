module.exports = {
    clearMocks: true,
    collectCoverageFrom: [
        '<rootDir>/src/app/**/*.ts',
        // Only proxy methods
        '!<rootDir>/src/app/components/fs-manager/**/*',
        // Only proxy methods
        '!<rootDir>/src/app/components/spec-builder/**/*',
        // Only proxy methods
        '!<rootDir>/src/app/components/spec-generator/**/*'
    ],
    coveragePathIgnorePatterns: [
        '.*\\.d\\.ts'
    ],
    testMatch: [
        '<rootDir>/src/**/*.spec.ts'
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ],
    setupFiles: [
        '<rootDir>/configs/jest/setup/console.setup.js'
    ],
    testURL: 'http://localhost',
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/configs/jest/transform/file.transform.js',
        '^.+\\.tsx?$': '<rootDir>/configs/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'web.ts',
        'ts',
        'tsx',
        'web.js',
        'js',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': { tsConfig: 'src/tsconfig.spec.json' }
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
