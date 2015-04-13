module.exports = function (config) {

    config.set({
        basePath: '../',

        files: [
            <!-- injector:js -->
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'src/guestbook-app.js',
            'src/guestbooks/guestbooks-module.js',
            'src/guestbooks/guestbooks-controller.js',
            'src/guestbooks/guestbooks-service.js',
            'test/mock/guestbook-app-mock.js',
            'src/guestbook-app_test.js'
            <!-- endinjector -->
        ],

        frameworks: ['jasmine'],

        exclude: [],

        reporters: ['dots'],

        // web server port
        port: 9876,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)

        browsers: ['PhantomJS'], // Jenkins and clean install

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true

    });
};
