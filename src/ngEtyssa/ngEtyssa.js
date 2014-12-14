// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('ngEtyssa.config', [])
    .value('ngEtyssa.config', {
        debug: true
    });

// Modules
angular.module('ngEtyssa.services', []);
angular.module('ngEtyssa',
    [
        'ngEtyssa.config',
        'ngEtyssa.services',
        'ngResource'
    ]);
