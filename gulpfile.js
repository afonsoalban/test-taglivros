var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var nib = require('nib');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cached');

gulp.task('stylus', function () {
	return gulp.src('./source/styl/style.styl')
	.pipe(stylus({
		use: nib(),
		compress: true,
		sourcemap: false
	}))
	.on('error', trataErro)
	// .pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('./assets/css/'))
	.pipe(browserSync.stream());
});

gulp.task('uglify:cache', function () {
	return gulp.src('./source/js/**/*.js')
	.pipe(cache('uglify'))
	.pipe(uglify())
	.on('error', trataErro)
	.pipe(gulp.dest('./assets/js/'));
});

gulp.task('uglify', function () {
	return gulp.src('./source/js/**/*.js')
	.pipe(uglify())
	.on('error', trataErro)
	.pipe(gulp.dest('./assets/js/'));
});

gulp.task('js-watch', ['uglify:cache'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('default', ['stylus', 'uglify']);

gulp.task('bs', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./source/styl/**/*.styl', ['stylus']);
	gulp.watch('./source/js/**/*.js', ['js-watch']);
	gulp.watch('./*.html').on('change', browserSync.reload);
});

function trataErro (erro) {
  console.error( erro.toString() );
  this.emit('end')
}