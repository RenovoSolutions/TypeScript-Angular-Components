// Karma full browser configuration

var karmaSettings = require('gulp-utilities').karma.tc;
var config = require('./karma.shared.conf');

module.exports = function (karma) {
	config(karma, karmaSettings);
	karmaSettings.browsers = ['Chrome', 'Firefox'];

	karma.set(karmaSettings);
};
