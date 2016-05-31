var defaultConfig = require('./karma.conf.js');

module.exports = function (config) {
	defaultConfig(config);
	config.set({
		singleRun: false,
		autoWatch: true,
	});
};

// // Karma debug configuration

// var karmaSettings = require('gulp-utilities').karma.debug;
// var config = require('./karma.shared.conf');

// module.exports = function (karma) {
// 	config(karma, karmaSettings);
// };
