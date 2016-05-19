'use strict';

const externalDeps = [
	'@angular/*',
	'angular',
	'angular-mocks',
	'angular-sanitize',
	'angular-ui-bootstrap',
	'angular-ui-router',
	'bootstrap',
	'jquery',
	'rxjs',
	'rxjs/*',
	'lodash',
	'moment',
	'moment-timezone',
	'typescript-angular-utilities',
];

const map = {
	'@angular': 'node_modules/@angular',
	'angular': 'node_modules/angular/angular',
	'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
	'angular-animate': 'node_modules/angular-animate/angular-animate.js',
	'rxjs': 'node_modules/rxjs/Rx',
	'lodash': 'node_modules/lodash/index',
	'moment': 'node_modules/moment/moment',
	'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min',
	'signature_pad': 'node_modules/signature_pad/signature_pad',
	'ng-wig': 'node_modules/ng-wig',
	'ui-select': 'node_modules/ui-select/index',
	'ui-select/dist': 'node_modules/ui-select/dist',
	'text': 'node_modules/system-text/text',
	'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js',
	'typescript-angular-utilities': 'node_modules/typescript-angular-utilities/output/utilities',
};

let meta = externalDeps.reduce((curMeta, dep) => {
	curMeta[dep] = { build: false };
	return curMeta;
}, {});

meta['components/*.html'] = {
	loader: 'text',
};

System.config({
	meta,
	map,
	// packages: {
	// 	'libraries': {
	// 		defaultExtension: 'js',
	// 	},
	// 	'bootstrapper': {
	// 		defaultExtension: 'js',
	// 	},
	// 	'source': {
	// 		defaultExtension: 'js',
	// 	},
	// },
	paths: {
		// CSS and HTML paths have to be more specific than JS paths to take precidence
		'components/*.html': 'components/*.html',
		'*': '*.js',
	},
});

System.register('jquery', [], true, function () {
	return window.$;
});

System.register('angular', [], true, function () {
	return window.angular;
});

System.register('angular-ui-bootstrap', [], true, function () {
	return window.angular;
});

System.register('angular-sanitize', [], true, function () {
	return window.angular;
});
