// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'target/dist/bower_components/es5-shim/es5-shim.js',
        'target/dist/bower_components/json3/lib/json3.min.js',
        'target/dist/bower_components/jquery/dist/jquery.js',
        'target/dist/bower_components/angular/angular.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.tpl.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'target/dist/bower_components/angular-ui-router/release/angular-ui-router.js',
        'target/dist/bower_components/leaflet/dist/leaflet.js',
        'target/dist/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'target/dist/bower_components/angular-resource/angular-resource.js',
        'target/dist/bower_components/ng-table/dist/ng-table.js',
        'target/dist/scripts/app.js',
        'target/dist/scripts/controllers/_module.js',
        'target/dist/scripts/controllers/masterController.js',
        'target/dist/scripts/controllers/mapController.js',
        'target/dist/scripts/controllers/usbDirectiveController.js',
        'target/dist/scripts/controllers/dateFilterDirectiveController.js',
        'target/dist/scripts/controllers/resultSetDirectiveController.js',
        'target/dist/scripts/controllers/myWorkspaceDirectiveController.js',
        'target/dist/scripts/controllers/myProfileDirectiveController.js',
        'target/dist/scripts/controllers/searchFilterRibbonDirectiveController.js',
        'target/dist/scripts/controllers/objectInfoModalController.js',
        'target/dist/scripts/controllers/keywordFilterDirectiveController.js',
        'target/dist/scripts/controllers/listViewDirectiveController.js',
        'target/dist/scripts/controllers/objectInfoModalController.js',
        'target/dist/scripts/controllers/objectDownloadModalController.js',
        'target/dist/scripts/directives/_module.js',
        'target/dist/scripts/directives/usbDirective.js',
        'target/dist/scripts/directives/dateFilterDirective.js',
        'target/dist/scripts/directives/resultSetDirective.js',
        'target/dist/scripts/directives/myWorkspaceDirective.js',
        'target/dist/scripts/directives/myProfileDirective.js',
        'target/dist/scripts/directives/searchFilterRibbonDirective.js',
        'target/dist/scripts/directives/keywordFilterDirective.js',
        'target/dist/scripts/directives/listViewDirective.js',
        'target/dist/scripts/services/_module.js',
        'target/dist/scripts/services/mockService.js',
        'target/dist/scripts/services/searchService.js',
        'target/dist/scripts/services/sessionService.js',
        'target/dist/scripts/filters/_module.js',
        'target/dist/scripts/filters/textLengthFilter.js',
        'target/dist/bower_components/angular-mocks/angular-mocks.js',
        'app/templates/datefilter-directive.html',
        'app/templates/keyword-filter-directive.html',
        'app/templates/list-view-directive.html',
        'app/templates/my-profile-directive.html',
        'app/templates/my-workspace-directive.html',
        'app/templates/object-download-modal-template.html',
        'app/templates/object-info-modal-template.html',
        'app/templates/resultset-directive.html',
        'app/templates/search-filter-ribbon-directive.html',
        'app/templates/search-filter-ribbon-popup.html',
        'app/templates/usb-directive.html',
        'test/spec/controllers/objectDownloadModalTest.js',
        'test/spec/controllers/objectInfoModalTest.js',
        'test/spec/filters/textLengthFilterTest.js',
        {pattern: 'test/res/**/*.json', watched: true, included: true, served: true}
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    
    
    preprocessors: {
        '**/*.json': ['gb-json2js'],
        '**/templates/**/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
        moduleName: 'templates'
    },
    
    reporters: ['progress', 'junit'],
    junitReporter: {
        outputFile: 'test-results.xml'
    }
  });
};
