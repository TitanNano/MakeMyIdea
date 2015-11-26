var gulp 	 = require('gulp'),
	babel = require('gulp-babel'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	es = require('event-stream'),
	changed = require('gulp-changed'),
	runSequence = require('run-sequence');

var distServer = 'dist/';
var distClient = 'dist/client/';
var temp = 'dist/temp/';

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('copyBuildStage', function(){
	return es.merge(gulp.src(['src/**/*.*', '!src/shared/**/*.js'])
						.pipe(changed(distServer))
						.pipe(gulp.dest(temp)),

					gulp.src('src/shared/**/*.*')
						.pipe(changed(distServer))
						.pipe(gulp.dest(temp + 'frontend/'))
						.pipe(gulp.dest(temp + 'backend/'))
				);
});

gulp.task('compile', ['copyBuildStage'], function(){
	return gulp.src([temp + '/**/*.js', '!**/node_modules/**', '!**/frontend/libs/**'])
		.pipe(changed(distServer))
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets : ['es2015'],
				comments : false
			}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(temp));
});

gulp.task('copyToDist', ['copyBuildStage', 'compile'],  function(){
	return es.merge(gulp.src(temp + 'backend/**')
						.pipe(gulp.dest(distServer)),

					gulp.src(temp + 'frontend/**')
						.pipe(gulp.dest(distClient))
				);
});

gulp.task('clean:temp', ['copyToDist'], function(){
	return del(['dist/temp']);
})

gulp.task('copyDependecies', function(){
	return es.merge(
		gulp.src('node_modules/systemjs/dist/system.js')
			.pipe(gulp.dest(distClient + 'libs/')),

		gulp.src(['bower_components/angular-material/angular-material.min.css'])
			.pipe(gulp.dest(distClient + 'stylesheets/angular')),

		gulp.src(['bower_components/angular/angular.min.js',
				  'bower_components/angular-aria/angular-aria.min.js',
				  'bower_components/angular-animate/angular-animate.min.js',
				  'bower_components/angular-material/angular-material.min.js'])
			.pipe(gulp.dest(distClient + 'libs/angular/'))
	);
});

gulp.task('watch', ['default'], function(){
	gulp.watch(['src/**/*.*'], ['copyToDist', 'clean:temp']);
})

gulp.task('default', function(cb){
	runSequence('clean', ['copyDependecies', 'clean:temp'], cb);
});
