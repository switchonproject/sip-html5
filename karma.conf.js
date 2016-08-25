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
        'target/dist/bower_components/angular-sanitize/angular-sanitize.min.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.tpl.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'target/dist/bower_components/angular-ui-router/release/angular-ui-router.js',
        'target/dist/bower_components/leaflet/dist/leaflet-src.js',
        'target/dist/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'target/dist/bower_components/angular-resource/angular-resource.js',
        'target/dist/bower_components/ng-table/dist/ng-table.js',
        'target/dist/bower_components/leaflet-draw/dist/leaflet.draw-src.js',
        'target/dist/bower_components/leaflet-styled-layercontrol/src/styledLayerControl.js',
        'target/dist/bower_components/esri-leaflet/dist/esri-leaflet.js',
        'target/dist/bower_components/Wicket/wicket.js',
        'target/dist/bower_components/Wicket/wicket-leaflet.js',
        'target/dist/scripts/app.js',
        'target/dist/scripts/controllers/_module.js',
        'target/dist/scripts/controllers/masterController.js',
        'target/dist/scripts/controllers/mapViewDirectiveController.js',
        'target/dist/scripts/controllers/usbDirectiveController.js',
        'target/dist/scripts/controllers/myWorkspaceDirectiveController.js',
        'target/dist/scripts/controllers/myProfileDirectiveController.js',
        'target/dist/scripts/controllers/searchFilterRibbonDirectiveController.js',
        'target/dist/scripts/controllers/keywordFilterDirectiveController.js',
        'target/dist/scripts/controllers/countriesFilterDirectiveController.js',
        'target/dist/scripts/controllers/listViewDirectiveController.js',
        'target/dist/scripts/controllers/objectDetailController.js',
        'target/dist/scripts/controllers/searchFilterTagDirectiveController.js',
        'target/dist/scripts/controllers/postSearchFilterDirectiveController.js',
        'target/dist/scripts/controllers/categoriesDirectiveController.js',
        'target/dist/scripts/controllers/mapViewController.js',
        'target/dist/scripts/directives/_module.js',
        'target/dist/scripts/directives/mapViewDirective.js',
        'target/dist/scripts/directives/usbDirective.js',
        'target/dist/scripts/directives/resultListDirective.js',
        'target/dist/scripts/directives/myWorkspaceDirective.js',
        'target/dist/scripts/directives/myProfileDirective.js',
        'target/dist/scripts/directives/searchFilterRibbonDirective.js',
        'target/dist/scripts/directives/keywordFilterDirective.js',
        'target/dist/scripts/directives/countriesFilterDirective.js',
        'target/dist/scripts/directives/listViewDirective.js',
        'target/dist/scripts/directives/searchOptionsDirective.js',
        'target/dist/scripts/directives/searchFilterTagDirective.js',
        'target/dist/scripts/directives/postSearchFilterDirective.js',
        'target/dist/scripts/directives/categoriesDirective.js',
        'target/dist/scripts/directives/masterToolbarDirective.js',
        'target/dist/scripts/directives/resultPagerDirective.js',
        'target/dist/scripts/services/_module.js',
        'target/dist/scripts/services/mockService.js',
        'target/dist/scripts/services/shareService.js',
        'target/dist/scripts/services/searchService.js',
        'target/dist/scripts/services/sessionService.js',
        'target/dist/scripts/services/tagGroupService.js',
        'target/dist/scripts/services/featureRendererService.js',
        'target/dist/scripts/services/masterToolbarService.js',
        'target/dist/scripts/services/filterService.js',
        'target/dist/scripts/filters/_module.js',
        'target/dist/scripts/filters/textLengthFilter.js',
        'target/dist/scripts/filters/representationIconFilter.js',
        'target/dist/scripts/factories/_module.js',
        'target/dist/scripts/factories/AppConfigFactory.js',
        'target/dist/scripts/factories/FilterExpressionFactory.js',
        'target/dist/scripts/factories/FilterExpressionsFactory.js',
        'target/dist/bower_components/angular-mocks/angular-mocks.js',
        'app/templates/categories-directive-popup.html',
        'app/templates/categories-directive-template.html',
        'app/templates/countries-filter-directive.html',
        'app/templates/datefilter-directive.html',
        'app/templates/filter-expression-editor-popup.html',
        'app/templates/geo-buffer-editor-popup.html',
        'app/templates/geo-editor-popup.html',
        'app/templates/keyword-filter-directive.html',
        'app/templates/limit-editor-popup.html',
        'app/templates/list-view-directive.html',
        'app/templates/map-view-directive.html',
        'app/templates/master-toolbar-template.html',
        'app/templates/my-profile-directive.html',
        'app/templates/my-workspace-directive.html',
        'app/templates/object-representation-template.html',
        'app/templates/post-search-filter-directive.html',
        'app/templates/result-pager-template.html',
        'app/templates/resultlist-directive.html',
        'app/templates/search-filter-ribbon-directive.html',
        'app/templates/search-filter-ribbon-popup.html',
        'app/templates/search-filter-tag-directive-template.html',
        'app/templates/search-options-directive.html',
        'app/templates/search-progress-modal-template.html',
        'app/templates/usb-directive.html',
        'app/views/listView.html',
        'app/views/loginView.html',
        'app/views/mapView.html',
        'app/views/object-detail-view.html',
        'app/views/profileView.html',
        'app/views/thumbnailView.html',
        'test/spec/directives/mapViewDirectiveControllerTest.js',
        'test/spec/filters/textLengthFilterTest.js',
        'test/spec/services/searchServiceTest.js',
        {pattern: 'test/res/**/*.json', watched: true, included: true, served: true}
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8088,

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
        '**/templates/**/*.html': ['ng-html2js'],
        '**/views/**/*.html': ['ng-html2js']
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
