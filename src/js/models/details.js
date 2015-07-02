define([
'backbone',
'models/favorite'
],
	function (Backbone, favorite) {
		var Details = Backbone.Model.extend({
			"requestParam": {
				"v": 20140806,
				"client_id": "A0LLGYWHZ4LQ3TMF5U35ZJWE2Y1C1DIH2C3WFWXQJSLTTJRL",
				"client_secret": "F30LM3D0JC22AVWTFYJPSPYBFKXLAX1WINV4OWK00PFBUFRN"
			},

			"getData": function () {
				this.url = 'https://api.foursquare.com/v2/venues/' + this.get('venueId');
				this.fetch({
					data: $.param(this.requestParam)
				});
			},
			
			"initialize": function() {
				this.set('favorite', new favorite());
				this.updateFavorite();
			},
			
			"updateFavorite": function() {
				console.log("Update favorite");
				this.get('favorite').getData(window.sessionStorage.getItem('id_user'), this.get('venueId'));
			},

			"parse": function (resp) {
				return resp.response.venue;
			},

			"defaults": {},
		});

		return Details;
	}
);