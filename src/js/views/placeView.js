define([
'backbone',
'handlebars',
'text!views/templates/placeView.hbs',
],
	function (Backbone, Handlebars, template) {
		'use strict';

		var PlaceView = Backbone.View.extend({
			"tagName": "div",

			"template": Handlebars.compile(template),

			"className": "place col-xs-12 col-sm-6 col-lg-4",

			"render": function () {
				this.$el.html(this.template(this.model.attributes));
				return this;
			}
		});

		return PlaceView;
	}
);