define([
		'backbone'
	], 
	function (Backbone) {
		var Search = Backbone.Collection.extend({
			/**/
			"request": {
				"sortByDistance": 1,
				"venuePhotos": 1,
				"v": 20140806,
				"client_id": "A0LLGYWHZ4LQ3TMF5U35ZJWE2Y1C1DIH2C3WFWXQJSLTTJRL",
				"client_secret": "F30LM3D0JC22AVWTFYJPSPYBFKXLAX1WINV4OWK00PFBUFRN"
			},
			"url": "https://api.foursquare.com/v2/venues/explore",
			"fetchSearch": function(ll, query, location) {
				if (ll !== undefined) {
					this.request.ll = ll;
				}
				
				if (query !== undefined) {
					this.request.query = query;
				}
				
				if (location !== undefined) {
					this.request.near = location;
				}
				
				this.fetch({data: $.param(this.request)});
			}
		});
		
		return Search;
	}
);