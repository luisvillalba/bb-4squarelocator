require.config({
    "baseUrl": "js",
    "paths": {
		"text" : "vendor/requirejs-text/text",
        "jquery": "vendor/jquery/dist/jquery.min",
		"underscore": "vendor/underscore/underscore-min",
		"backbone": "vendor/backbone/backbone-min",
		"ls": "vendor/backbone.localstorage/backbone.localStorage",
		"handlebars": "vendor/handlebars/handlebars",
		"hbHelpers": "util/hb-helpers",
		"router": "routers/router",
		"MainView": "views/MainView",
		"search": "collections/search"
    },
	"shim": {
		"underscore": {
			"exports": "_"
		},
		"backbone": {
			"deps": ['underscore', 'jquery'],
			"exports": "Backbone"
		},
		'ls': {
			"deps": ['backbone'],
			"exports": "Backbone"
		},
        'hbHelpers': {
            deps: ['handlebars'],
            exports: 'Handlebars'
        }
	}
});

require([
	'app/app'
], function(App) {
	App.init();
});