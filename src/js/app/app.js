var Global = {
    "ENTER_KEY": 13
}

define([
'backbone',
'router'
],
    function (Backbone, router) {
        'use strict';

        var App = {
            "init": function () {
                new router();

                Backbone.history.start();
            }
        };

        return App;
    }
);