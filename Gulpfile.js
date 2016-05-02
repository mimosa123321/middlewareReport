var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    eslint = require('gulp-eslint'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    del = require('del'),
    copy = require('gulp-contrib-copy'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('clean',function(done){
    return del(['dest/**'],done);
});

gulp.task('eslint', function () {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('copy',['clean'],function(){
    gulp.src('./src/images/**/*')
        .pipe(copy())
        .pipe(gulp.dest('dest/images/'));
    
    gulp.src('./src/css/lib/**/*')
    	.pipe(copy())
    	.pipe(gulp.dest('dest/css/lib/'));
});

gulp.task('sass', ['copy'], function() {
    gulp.src('./src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dest/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/css/**/*.scss', ['sass']);
});

//gulp.task('compile',['eslint', 'sass'], function() {

gulp.task('compile',['sass'], function() {
    return browserify({
        entries: ['./index.js'],
        basedir: __dirname,
        debug: true
    })
        .transform(babelify,{presets: ["es2015","react","stage-0"], plugins: ["transform-object-rest-spread"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest/js'));
});

//gulp.task('default', ['eslint', 'clean', 'sass', 'compile', 'test']);
gulp.task('default', ['compile']);