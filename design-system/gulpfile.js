var gulp = require('gulp');

gulp.task('hello', function(){
	console.log('Hello Tammy');
});

gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var cssnano = require('gulp-cssnano');
    var tailwindcss = require('tailwindcss');

    return gulp.src('src/css/main.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ 
        	require('precss'), 
        	require('autoprefixer'),
        	tailwindcss('src/js/tailwind.js')
        ]) )
        .pipe( cssnano() )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('build/css/') );
});

gulp.task('sass', function(){
	var sass = require('gulp-sass');
	return gulp.src('src/scss/main.scss')
	    .pipe(sass()) // Converts Sass to CSS with gulp-sass
	    .pipe(gulp.dest('src/css'))
	    .start('css');
});

gulp.task('webserver', function(){
	var webserver = require('gulp-webserver');
	return gulp.src('./build')
	    .pipe(webserver({
	      livereload: true,
	      directoryListing: false,
	      open: '/html/index.html',
	      port: 9999
	    }));
});

gulp.task('build', ['css'], function(){
	return gulp.src('src/html/**')
			.pipe(gulp.dest('build/html'));
});

gulp.task('watch', ['build'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass', 'build']);
  gulp.watch('src/html/**/*.html', ['build']);
  //gulp.start('css'); 
  // Other watchers
});