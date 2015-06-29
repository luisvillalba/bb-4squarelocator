define([
		'backbone',
        'place'
	], 
	function (Backbone, place) {
		var Search = Backbone.Collection.extend({
            "requestParam": {
                        "sortByDistance": 1,
                        "venuePhotos": 1,
                        "v": 20140806,
                        "client_id": "A0LLGYWHZ4LQ3TMF5U35ZJWE2Y1C1DIH2C3WFWXQJSLTTJRL",
                        "client_secret": "F30LM3D0JC22AVWTFYJPSPYBFKXLAX1WINV4OWK00PFBUFRN"
            },
            
			"url": "https://api.foursquare.com/v2/venues/explore",
            
            "parse": function(resp) {
                return resp.response.groups[0].items;
            },
            
            "model": place,
            
            /* Prepares the fetch*/
            "fetchSearch": function(param) {
                var request = {};
                
				if (param.hasOwnProperty('ll')) {
					this.requestParam.ll = param.ll;
				} else {
                    delete this.requestParam.ll;
                }
				
				if (param.hasOwnProperty('query')) {
					this.requestParam.query = param.query;
				}
				
				if (param.hasOwnProperty('whereText')) {
					this.requestParam.near = param.whereText;
				} else {
                    delete this.requestParam.near;
                }
                
                if (param.hasOwnProperty('section')) {
					this.requestParam.section = param.section;
				} else {
                    delete this.requestParam.section;
                }
                
                request.data = $.param(this.requestParam);
				
				this.fetch(request);
			}
		});
		
		return Search;
	}
);