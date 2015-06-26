var Global = {
	"ENTER_KEY": 13
}

define([
	'backbone',
	'MainView'
    ],
    function (Backbone, MainView) {
        'use strict';
	
		var App = {
			"init": function() {
				new MainView();
			}
		};
	
		return App;
    }
);