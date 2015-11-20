var gulp 	 = require('gulp'),
	babel = require('gulp-babel'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');

var dist = 'dist/';

var cutSrcFromPath = function(pathObject, filePath) {
	return pathObject.join()
}

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
	return gulp.src([dist + '/**/*.js', '!**/node_modules/**'])
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets : ['es2015'],
				comments : false
			}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dist));
})

gulp.task('copyBowerDependecies', ['clean'], function(){
	return gulp.src('bower_components/systemjs/build/systemjs.min.js')
		.pipe(gulp.dest(dist + 'frontend/lib/'));
});

gulp.task('default', ['copy', 'copy:shared', 'compile', 'copyBowerDependecies']);
