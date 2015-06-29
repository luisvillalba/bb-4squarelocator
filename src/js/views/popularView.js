define([
		'backbone',
        'handlebars',
        'text!views/templates/popularView.hbs',
	], 
	function (Backbone, Handlebars, template) {
		'use strict';
	
		var PopularView = Backbone.View.extend({
			"tagName": "div",
            
            "template": Handlebars.compile(template),
            
            "className": "popularContainer",
            
            "initialize": function() {
                if (this.model.get('size') == 'small') {
                    this.$el.addClass('col-xs-6 col-sm-3 col-lg-3');
                } else {
                    this.$el.addClass('col-xs-12 col-sm-6 col-lg-6');
                }
            },
            
            "render": function() {
                this.$el.html(this.template(this.model.attributes));
            }
		});
	
		return PopularView;
	}
);