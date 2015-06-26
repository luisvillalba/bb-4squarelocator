module.exports = function (grunt) {

	grunt.initConfig({
		auto_install: {
			local: {
				npm: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-auto-install');
	
	grunt.registerTask('default', []);
	grunt.registerTask('install', ['auto_install']);

};