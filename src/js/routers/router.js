define([
'backbone',
'MainView'
],
    function (Backbone, MainView) {
        var Router = Backbone.Router.extend({
            routes: {
                "": "showPopulars",
				"arroundme/:query": "searchArroundMe",
                "populars": "showPopulars"
            },
            
            "initialize": function() {
                this.mainView = new MainView();
            },

            "showPopulars": function (param) {
                console.log("showPopulars");
                this.mainView.searchPopular();
            },
			
			"searchArroundMe": function (param) {
                console.log("searchArroundMe" + param);
                this.mainView.searchArroundMe(param);
            }
        });
    
        return Router;
    }
);