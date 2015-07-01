require.config({
	"baseUrl": "js",
	"paths": {
		"text": "vendor/requirejs-text/text",
		"jquery": "vendor/jquery/dist/jquery.min",
		"underscore": "vendor/underscore/underscore-min",
		"backbone": "vendor/backbone/backbone-min",
		"ls": "vendor/backbone.localstorage/backbone.localStorage",
		"handlebars": "vendor/handlebars/handlebars",
		"hbHelpers": "util/hb-helpers",
		"router": "routers/router",
		"MainView": "views/mainView",
		"search": "collections/search",
		"place": "models/place",
		"placeView": "views/placeView",
		"popularView": "views/popularView",
		"detailView": "views/detailView"
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
], function (App) {
	App.init();
});