'use strict';

const gulp = require('gulp');
const Builder = require('systemjs-builder');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

const utilities = require('gulp-utilities');
utilities.gulp.clean.config();

const scriptFiles = ['./source/**/*.js', './source/**/*.html', './source/**/*.css', '!./source/**/*.tests.js', './bootstrapper/**/*.js', './bootstrapper/**/*.html'];
const cssFiles = ['./node_modules/ng-wig/dist/**/*.css', './libraries/**/*.css', './source/**/*.css', '!./source/**/*ng2.css'];

gulp.task('bundle-all.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle-all']);
});

gulp.task('bundle-all', (done) => {
	runSequence('bundle-bootstrapper',
				'bundle-css',
				'bundle-css.minify',
				done);
});

gulp.task('bundle-css.watch', (done) => {
	gulp.watch(cssFiles, ['bundle.css']);
});

gulp.task('bundle-css', () => {
	return gulp.src(cssFiles)
		.pipe(concat('components.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle-css.minify', () => {
	return gulp.src(cssFiles)
		.pipe(cleanCss())
		.pipe(concat('components.min.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('bundle-bootstrapper.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle-bootstrapper']);
});

gulp.task('bundle-bootstrapper', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle('bootstrapper/app.js', 'bootstrapper/app.bundle.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			done(err);
		});
});

const testFiles = [
	'source/ui.module.js',
	'karma-test-setup.js',
	'source/**/*.tests.js',
];
const testDepsPath = '(' + testFiles.join(' + ') + ')';
const testsBundlePath = 'tests/tests.bundle.js';
const renovoBundlePath = 'tests/renovo.bundle.js';
const vendorBundlePath = 'tests/vendor.bundle.js';

gulp.task('bundle-tests.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle-tests']);
})

gulp.task('bundle-tests', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle([testDepsPath, vendorBundlePath, renovoBundlePath].join(' - '), testsBundlePath, {
				sourceMaps: true,
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			done(err);
		});
});

const renovoDeps = [
	'node_modules/typescript-angular-utilities/source/**/*.js',
];
const renovoDepsPath = '(' + renovoDeps.join(' + ') + ')';

gulp.task('bundle-vendor', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle([testDepsPath, '[source/**/*.js]', '[source/**/*.html]', renovoDepsPath].join(' - '), vendorBundlePath);
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			done(err);
		});
});

gulp.task('bundle-renovo-deps.watch', (done) => {
	gulp.watch(renovoDeps, ['bundle-renovo-deps']);
})

gulp.task('bundle-renovo-deps', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			return builder.bundle([renovoDepsPath, vendorBundlePath].join(' - '), renovoBundlePath);
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			done(err);
		});

});
