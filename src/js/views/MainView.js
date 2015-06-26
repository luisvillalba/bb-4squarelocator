define([
		'jquery',
		'backbone',
		'handlebars',
		'search',
		'text!views/templates/MainView.hbs',
		'text!views/templates/MainView.json'
	], 
	function ($, Backbone, Handlebars, search, template, data) {
		'use strict';
	
		var MainView = Backbone.View.extend({
			"selectors": {
				"ids": {
					"query": "#query",
					"where": "#where",
					"whereText": "#whereText"
				}
			},
			
			/* Container of the view */
			"el": '#AppContainer',
			
			/* Default data to populate the template */
			"defaultData": $.parseJSON(data),
			
			/* Collection representing the results by default is an empty object */
			"results": {},
			
			/* Events and events handlers */
			"events": {
				"keypress #query": "keyPressedOnSearch",
				"keypress #where": "keyPressedOnSearch"
			},
			
			/* Main template */
			"template": Handlebars.compile(template),
			
			/* Render method */
			"render": function() {
				/* Bring the template and populate it with the data from the config file */
				this.$el.html(this.template(this.defaultData));
			},
			
			/* Initializes the app main view */
			"initialize": function() {
				this.render();
				this.$query = this.$el.find(this.selectors.ids.query);
				this.$where = this.$el.find(this.selectors.ids.where);
				this.$whereText = this.$el.find(this.selectors.ids.whereText);
			},
			
			/* Handles the keypress event looking for an Enter key */
			"keyPressedOnSearch": function(e) {
				if (e.which !== Global.ENTER_KEY || !this.$query.val().trim()) {
					return;
				} else {
					this.search();
				}
			},
			
			/* Executes a search */
			"search": function() {
				var result,
					ll,
					whereText,
					query = $.trim(this.$query.val()),
					where = this.$where.val();
				
				switch (where) {
					case "0":
						var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
						
						navigator.geolocation.getCurrentPosition(
							function(pos) {
								ll = pos.latitude + ',' + pos.logitude;
								this.executeSearch(ll, query, whereText);
							},function() {
								console.log("Getting your locationY");
							},
							options
						);
						
						/* Verify user location*/
						if (!ll) {
							alert('Sorry, I coudn\'t get your location');
							return false;
						}
						
						break;
					case  "1": 
						whereText = this.$whereText.val();
						this.executeSearch(ll, query, whereText);
						break;
				}
			},
			"executeSearch": function(ll, query, whereText) {
				/* Instantiates a new search*/
				result = new search();
				
				/* Executes the new search */
				result.fetchSearch(ll, query, whereText);
			}
		});
	
		return MainView;
	}
);