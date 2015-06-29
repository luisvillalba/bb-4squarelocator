define([
'backbone',
'MainView'
],
    function (Backbone, MainView) {
        var Router = Backbone.Router.extend({
            routes: {
                "/": "showPopulars",
                "*populars": "showPopulars"
            },
            
            "initialize": function() {
                this.mainView = new MainView();
            },

            "showPopulars": function (param) {
                console.log("populares");
                this.mainView.searchPopular();
            }
        });
    
        return Router;
    }
);