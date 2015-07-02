define([
'backbone'
],
	function (Backbone) {
		var Favorite = Backbone.Model.extend({
			"baseURL": 'http://luisvapi.esy.es/4slocator/favorite/',
			
			"initialize": function() {
				console.log("new favorite");
			},

			"getData": function (userID, venueID) {
				this.url = this.baseURL + userID + '/' + venueID;
				this.fetch();
			},

			"defaults": {},
		});

		return Favorite;
	}
);