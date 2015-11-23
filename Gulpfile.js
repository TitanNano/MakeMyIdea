var gulp 	 = require('gulp'),
	babel = require('gulp-babel'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	es = require('event-stream');

var dist = 'dist/';

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('copy', ['clean'], function(){
	return gulp.src(['src/**/*.*', '!src/shared/**/*.js'])
		.pipe(gulp.dest(dist));

});

gulp.task('copy:shared', ['copy'], function(){
	return gulp.src('src/shared/**/*.*')
		.pipe(gulp.dest(dist + 'frontend/'))
		.pipe(gulp.dest(dist + 'backend/'));
})

gulp.task('compile', ['copy', 'copy:shared'], function(){
	return gulp.src([dist + '/**/*.js', '!**/node_modules/**', '!**/frontend/libs/**'])
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets : ['es2015'],
				comments : false
			}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist));
})

gulp.task('copyDependecies', ['clean'], function(){
	return es.merge(
		gulp.src('node_modules/systemjs/dist/system.js')
			.pipe(gulp.dest(dist + 'frontend/libs/')),

		gulp.src(['bower_components/angular-material/angular-material.min.css'])
			.pipe(gulp.dest(dist + 'frontend/stylesheets/angular')),

		gulp.src(['bower_components/angular/angular.min.js',
				  'bower_components/angular-aria/angular-aria.min.js',
				  'bower_components/angular-animate/angular-animate.min.js',
				  'bower_components/angular-material/angular-material.min.js'])
			.pipe(gulp.dest(dist + 'frontend/libs/angular/'))
	);
});

gulp.task('default', ['copy', 'copy:shared', 'compile', 'copyDependecies']);
