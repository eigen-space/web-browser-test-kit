const path = require('path');

exports.config = {
    runner: 'local',
    path: '/wd/hub',
    specs: [
        '**/*.e2e.spec.ts'
    ],
    maxInstances: 10,
    capabilities: [{ maxInstances: 5, browserName: 'chrome' }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        [
            'image-comparison',
            {
                baselineFolder: path.join(process.cwd(), './e2e/screenshotBaseline'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: path.join(process.cwd(), './e2e/.tmp/'),
                autoSaveBaseline: true
            }
        ]
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: { ui: 'bdd', timeout: 60000, require: ['tsconfig-paths/register'] },
    before: function() {
        require('ts-node').register({ files: true });
        // Set window size
        browser.setWindowSize(375, 700);
    }
};
