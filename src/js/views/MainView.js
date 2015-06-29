define([
		'underscore',
        'jquery',
		'backbone',
		'handlebars',
		'search',
        'views/placeView',
        'views/popularView',
		'text!views/templates/mainView.hbs',
		'text!views/templates/mainView.json',
	], 
	function (_, $, Backbone, Handlebars, search, placeView, popularView, template, data) {
		'use strict';
	
		var MainView = Backbone.View.extend({
			"selectors": {
				"id": {
					"query": "#query",
					"where": "#where",
					"whereText": "#whereText"
				},
                "class": {
                    "results": ".results",
                    "whereText": ".whereText"
                }
			},
			
			/* Container of the view */
			"el": "#AppContainer",
			
			/* Default data to populate the template */
			"defaultData": $.parseJSON(data),
			
			/* Collection representing the results by default is an empty object */
			"results": {},
			
			/* Events and events handlers */
			"events": {
				"keypress #query": "keyPressedOnSearch",
				"keypress #where": "keyPressedOnSearch",
                "keypress #whereText": "keyPressedOnSearch",
                "change #where": "locationChanged",
                "click .viewMoreVenue": "viewMoreVenue"
			},
			
			/* Main template */
			"template": Handlebars.compile(template),
			
			/* Render method */
			"render": function() {                
                console.log("Rendering view");
                
                /* Bring the template and populate it with the data from the config file */
				this.$el.html(this.template(this.defaultData));
			},
            
            "showResults": function() {
                var i,
                    itemView;
                
                if (this.collection.length > 0) {
                    console.log("Now I have results");
                    this.$results.html('<h5 class="col-xs-12 yes">Yes! I found some interesting places for you</h5>');
                    console.log(new placeView());
                    for (i in this.collection.models) {
                        itemView = new placeView({"model": this.collection.models[i]});
                        itemView.render();
                        this.$results.append(itemView.el.outerHTML);
                        console.log(itemView);
                    }
                } else {
                    this.$results.html('<div class="alert alert-warning" role="alert">Opps I coudn\'t find any place like that close to you...</div>');
                }
            },
            
            "showPopulars": function() {
                var i,
                    itemView;
                
                if (this.collectionPopulars.length > 0) {
                    this.$results.html('<h5 class="col-xs-12 yes">Some popular places arround you</h5>');
                    for (i = 0; i <= 8; i++) {
                        if (i == 0){
                            this.collectionPopulars.models[i].set('size','big');
                        } else if (i > 0) {
                            this.collectionPopulars.models[i].set('size','small');
                        }
                        itemView = new popularView({"model": this.collectionPopulars.models[i]});
                        itemView.render();
                        this.$results.append(itemView.el.outerHTML);
                        console.log(itemView);
                    }
                } else {
                    this.$results.html('<div class="alert alert-warning" role="alert">Opps I coudn\'t find any place like that close to you...</div>');
                }
            },
			
			/* Initializes the app main view */
			"initialize": function() {
                /* Gets the user location and stores it in the SS */
                this.findUserLocation();
                
                /* Instantiates a new search*/
                this.collection = new search();
                
                /* Instantiates a new search*/
                this.collectionPopulars = new search();
                
                /* Get the initial view */
                this.render();
                
				this.$query = this.$el.find(this.selectors.id.query);
				this.$where = this.$el.find(this.selectors.id.where);
				this.$whereText = this.$el.find(this.selectors.id.whereText);
                this.$results = this.$el.find(this.selectors.class.results);
                /* Starts to listens the events */
                this.listenEvents();
                this.searchPopular();
            },
            
            "listenEvents": function () {
                this.listenTo(this.collection, 'sync', _.bind(this.showResults, this));
                this.listenTo(this.collectionPopulars, 'sync', _.bind(this.showPopulars, this));
            },
            
            "findUserLocation": function() {
                navigator.geolocation.getCurrentPosition(
                    function (pos) {
                        console.log("Location found");
                        window.sessionStorage.setItem('ll', pos.coords.latitude + ',' + pos.coords.longitude);
                    },
                    function () {
                        alert('Sorry, I coudn\'t get your location');
                        return false;
                    }
                );
            },
            
            "viewMoreVenue": function(e) {
                var id = e.currentTarget.getAttribute('data-venueid');
                console.log(this.collection);
                console.log(id);
            },
			
			/* Handles the keypress event looking for an Enter key */
			"keyPressedOnSearch": function(e) {
				if (e.which !== Global.ENTER_KEY) {
					return;
				} else {
                    if (!this.$query.val().trim()){
                        this.searchPopular();
                    } else {
                        this.search();
                    }
				}
			},
            
            "locationChanged": function() {
				var value = this.$where.val(),
                    display;
                
                if (value == 0) {
                    display = "none";
                } else {
                    display = "block";
                }
                
                this.$el.find(this.selectors.id.whereText).val('');
                
                this.$el.find(this.selectors.class.whereText).css("display",display);
			},
			
			/* Executes a search */
			"search": function() {
                console.log("searching");
				var param = {},
                    result,
					where = this.$where.val();
				
                param.query = $.trim(this.$query.val())
                
				switch (where) {
					case "0":
                        param.ll = window.sessionStorage.getItem('ll');
                        /* Executes the new search */
                        this.collection.fetchSearch(param);

						break;
					case  "1": 
						param.whereText = this.$whereText.val();
                        console.log(param);
                        /* Executes the new search */
                        this.collection.fetchSearch(param);
						break;
				}
			},
            
            /* Executes a search */
			"searchPopular": function() {
                console.log("searching");
				var param = {},
                    result;
                
                param.ll = window.sessionStorage.getItem('ll');

                /* Executes the new search */
                this.collectionPopulars.fetchSearch(param);
			}
		});
	
		return MainView;
	}
);