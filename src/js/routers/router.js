define([
'backbone'
],
    function (Backbone) {
        var Router = Backbone.Router.extend({
            routes: {
                'val:param': 'method'
            },

            method: function (param) {

            }
        });
    
        return Router;
    }
);