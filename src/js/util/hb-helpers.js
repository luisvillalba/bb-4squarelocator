/**
 * This registers a new helper for handlebars templating so it can be used to check whether 2 values are equal
 */
define([
    'handlebars'
    ],
    function (Handlebars) {
		Handlebars.registerHelper('ifEqual', function (firstValue, secondValue, options) {
			if (firstValue === secondValue) {
				return options.fn(this);
			}
			return options.inverse(this);
		});
	
		return Handlebars;
	}
);