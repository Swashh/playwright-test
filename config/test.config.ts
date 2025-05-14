export const testConfig = {
    baseUrl: 'https://klr.com.ua/',
    timeout: 30_000,
    viewport: {
        width: 1280,
        height: 720
    },
    retries: 2,
    workers: 4,
    browsers: ['chromium'],
    testDir: './tests',
    outputDir: './test-results',
    // reporter: [
    //     ['list'],
    //     ['html', { outputFolder: './playwright-report' }]
    // ]
}; 