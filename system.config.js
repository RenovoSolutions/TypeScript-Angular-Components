'use strict';

const map = {
	'@angular': 'node_modules/@angular',
	'app': 'bootstrapper',
	'angular': 'node_modules/angular',
	'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
	'angular-animate': 'node_modules/angular-animate/angular-animate.js',
	'angular-ui-bootstrap': 'node_modules/angular-ui-bootstrap/index.js',
	'angular-sanitize': 'node_modules/angular-sanitize/index.js',
	'angular2-uuid': 'node_modules/angular2-uuid',
	'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap.js',
	'jquery': 'node_modules/jquery/dist/jquery.js',
	'lodash': 'node_modules/lodash/index',
	'moment': 'node_modules/moment/moment',
	'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min',
	'ng-wig': 'node_modules/ng-wig',
	'rl-async-testing': 'node_modules/rl-async-testing',
	'rl-http': 'node_modules/rl-http',
	'rxjs': 'node_modules/rxjs',
	'text': 'node_modules/system-text/text',
	'typescript-angular-utilities': 'node_modules/typescript-angular-utilities/source/main',
	'ui-select': 'node_modules/ui-select/index',
	'ui-select/dist': 'node_modules/ui-select/dist',
	'@angular/upgrade': 'node_modules/@angular/upgrade',
};

var angularPackageNames = [
	'core',
	'compiler',
	'common',
	'platform-browser',
	'platform-browser-dynamic',
	'http',
	'forms',
	// 'upgrade',
];

var defaultPackages = [
	'rl-async-testing',
	'rl-http',
];

const meta = {
	'*.html': {
		loader: 'text',
	},
	'*.css': {
		loader: 'text',
	},
};

var packages = {
	'app': {
		main: 'main.js',
	},
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
	'@angular/router': {
		main: 'index.js',
	},
	'@angular/upgrade': {
		main: 'bundles/upgrade.umd.js',
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
};

function setAngularPackage(packageName) {
	map[`@angular/${packageName}`] = `node_modules/@angular/${packageName}/bundles/${packageName}.umd.js`;
}

function setAngularTestingPackage(packageName) {
	map[`@angular/${packageName}/testing`] = `node_modules/@angular/${packageName}/bundles/${packageName}-testing.umd.js`;
}

function setDefaultPackage(packageName) {
	packages[packageName] = { main: 'index.js' };
}

angularPackageNames.forEach(setAngularPackage);
angularPackageNames.forEach(setAngularTestingPackage);
defaultPackages.forEach(setDefaultPackage);

System.config({
	meta,
	map,
	packages: packages,
});
