define([
		'backbone',
        'handlebars',
        'text!views/templates/detailView.hbs',
	], 
	function (Backbone, Handlebars, template) {
		'use strict';
	
		var PlaceView = Backbone.View.extend({
			"tagName": 'div',
            "template": Handlebars.compile(template),
            "className": 'details',
            "render": function() {
            }
		});
	
		return PlaceView;
	}
);