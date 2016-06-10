'use strict';

const map = {
	'@angular': 'node_modules/@angular',
	'angular': 'node_modules/angular',
	'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
	'angular-animate': 'node_modules/angular-animate/angular-animate.js',
	'angular-ui-bootstrap': 'node_modules/angular-ui-bootstrap/index.js',
	'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.min.js',
	'angular-sanitize': 'node_modules/angular-sanitize/index.js',
	'angular2-uuid': 'node_modules/angular2-uuid',
	'rxjs': 'node_modules/rxjs',
	'lodash': 'node_modules/lodash/index',
	'moment': 'node_modules/moment/moment',
	'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min',
	'signature_pad': 'node_modules/signature_pad/signature_pad',
	'ng-wig': 'node_modules/ng-wig',
	'ui-select': 'node_modules/ui-select/index',
	'ui-select/dist': 'node_modules/ui-select/dist',
	'text': 'node_modules/system-text/text',
	'jquery': 'node_modules/jquery/dist/jquery.js',
	'typescript-angular-utilities': 'node_modules/typescript-angular-utilities/source/main',
};

const meta = {
	'*.html': {
		loader: 'text',
	},
	'*.css': {
		loader: 'text',
	},
};

System.config({
	meta,
	map,
	packages: {
		'libraries': {
			defaultExtension: 'js',
		},
		'bootstrapper': {
			defaultExtension: 'js',
		},
		'source': {
			defaultExtension: 'js',
		},
		'node_modules': {
			defaultExtension: 'js',
		},
		'@angular/http': {
			main: 'index.js',
		},
		'@angular/core': {
			main: 'index.js',
		},
		'@angular/upgrade': {
			main: 'index.js',
		},
		'@angular/platform-browser-dynamic': {
			main: 'index.js',
		},
		'@angular/platform-browser': {
			main: 'index.js',
		},
		'@angular/compiler': {
			main: 'index.js',
		},
		'@angular/common': {
			main: 'index.js',
		},
		'angular2-uuid': {
			main: 'index.js',
		},
		'rxjs': {
			main: 'Rx.js',
		},
		'angular': {
			main: 'index.js',
		}
	},
});
