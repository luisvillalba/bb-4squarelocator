define([
        'underscore',
		'backbone',
        'handlebars',
        'models/details',
        'text!views/templates/detailView.hbs',
	], 
	function (_,Backbone, Handlebars, details, template) {
		'use strict';
	
		var PlaceView = Backbone.View.extend({
			"el": 'div.venueDetails',
            
            "template": Handlebars.compile(template),
            
            "initialize": function(options) {
                this.venueId = options.venueId;
                this.model = new details({"venueId": this.venueId});
                this.listenTo(this.model, 'sync', _.bind(this.render, this));
                this.model.getData();
            },
            
            "render": function() {
                console.log(this.model);
                this.$el.html(this.template(this.model.attributes));
            }
		});
	
		return PlaceView;
	}
);