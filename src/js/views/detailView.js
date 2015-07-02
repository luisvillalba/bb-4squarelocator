define([
'underscore',
'backbone',
'handlebars',
'models/details',
'text!views/templates/detailView.hbs',
],
	function (_, Backbone, Handlebars, details, template) {
		'use strict';

		var PlaceView = Backbone.View.extend({

			"template": Handlebars.compile(template),

			"selectors": {
				"id": {
					"map": "map"
				},
				
				"class": {
					"map": ".map",
					"viewMap": ".viewMap",
					"mapToggle": ".mapToggle"
				}
			},

			"events": {
				"click .viewMap": "showMap"
			},

			"initialize": function (options) {
				this.venueId = options.venueId;
				this.model = new details({
					"venueId": this.venueId
				});
				this.listenTo(this.model, 'sync', _.bind(this.render, this));
				this.model.getData();
				$(this.selectors.class.viewMap).data('mapstate', 'closed');
			},

			"showMap": function (e) {
				if ($(this.selectors.class.viewMap).data('mapstate') == 'closed' || $(this.selectors.class.viewMap).data('mapstate') == undefined) {
					console.log("opening map");
					$(this.selectors.class.map).css("display", "block");
					var mapProp = {
							"center": new google.maps.LatLng(e.currentTarget.getAttribute('data-lat'), e.currentTarget.getAttribute('data-lng')),
							"zoom": 17,
							"mapTypeId": google.maps.MapTypeId.ROADMAP
						},
						map = new google.maps.Map(document.getElementById(this.selectors.id.map), mapProp),
						marker = new google.maps.Marker({
							"position": mapProp.center,
							"animation": google.maps.Animation.BOUNCE
						});

					marker.setMap(map);

					google.maps.event.trigger(map, 'resize');
					$(this.selectors.class.viewMap).html('Close map').data('mapstate', 'open');
				} else {
					console.log("closing map");
					$(this.selectors.class.viewMap).data('mapstate', 'closed').html('View in Google Maps');
					$(this.selectors.class.map).css("display", "none");
				}
			},

			"render": function () {
				console.log(this.model);
				this.$el.html(this.template(this.model.attributes));
			}
		});

		return PlaceView;
	}
);