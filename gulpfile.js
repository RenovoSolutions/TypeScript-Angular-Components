'use strict';

const gulp = require('gulp');
const Builder = require('systemjs-builder');
const runSequence = require('run-sequence');
const del = require('del');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

// const utilities = require('gulp-utilities');
// utilities.gulp.clean.config();
gulp.task('clean', () => { console.log('placeholder for now') });

const scriptFiles = ['./source/**/*.js', './source/**/*.html', './source/**/*.css', '!./source/**/*.tests.js'];
const cssFiles = ['./node_modules/ng-wig/dist/**/*.css', './libraries/**/*.css', './source/**/*.css'];

gulp.task('bundle.watch', (done) => {
	gulp.watch(scriptFiles, ['bundle']);
});

gulp.task('bundle', (done) => {
	runSequence('copy',
				'systemjs',
				'clean-up',
				'bundle-css',
				'bundle-css.minify',
				done);
});

gulp.task('bundle-css', () => {
	return gulp.src(cssFiles)
		.pipe(concat('components.css'))
		.pipe(gulp.dest('./output'));
});

gulp.task('bundle-css.minify', () => {
	return gulp.src(cssFiles)
		.pipe(cleanCss())
		.pipe(concat('components.min.css'))
		.pipe(gulp.dest('./output'));
});

gulp.task('copy', () => {
	return gulp.src(scriptFiles)
		.pipe(gulp.dest('./components'))
});

gulp.task('systemjs', (done) => {
	var builder = new Builder();

	builder.loadConfig('./system.config.js')
		.then(() => {
			builder.config({
				buildCSS: false,
			});
			return builder.bundle('components/ui.module', 'output/components.js', {
				sourceMaps: true,
			});
		})
		.then(() => {
			return builder.bundle('components/ui.module', 'output/components.min.js', {
				minify: true,
				mangle: true,
				sourceMaps: false,
				globalDefs: { DEBUG: false },
			});
		})
		.then(() => {
			console.log('Build complete');
			done();
		})
		.catch((err) => {
			console.log('Build error');
			console.error(err);
		});
});

gulp.task('clean-up', () => {
	return del('./components');
});
