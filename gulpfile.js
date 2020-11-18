/**
 * 
 * Front-end Structure
 * 
 * @author Louis Young
 *
 */

// Node Module Dependancies.

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglifyes');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var wait = require('gulp-wait');
var imagemin = require('gulp-imagemin');


// Compile Sass to CSS.

gulp.task('styles', function () {
    // Where the Sass is coming from.
    gulp.src('./public_html/src/stylesheets/*.**')
        //  Error Handling.
        .pipe(wait(500))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(browserSync.stream())
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true,
            includePaths: './public_html/src/stylesheets',
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({
            suffix: '.min'
        }))
        // Where the Sass is going to.
        .pipe(gulp.dest('./public_html/dist/stylesheets/'))
});

// Compile JavaScript.

gulp.task('scripts', function () {
    // Where the scripts are coming from.
    gulp.src('./public_html/src/scripts/main*.js')
        // Error handling.
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(order([
            'main.js',
            'main.global.js',
            'main.*.js'
        ]))
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            mangle: false,
            ecma: 6
        }))
        // Where the scripts are going to.
        .pipe(gulp.dest('./public_html/dist/scripts/'))
    browserSync.reload();

});

// Compile vendor JavaScript.

gulp.task('vendor', function () {
    // Where the scripts are coming from.
    gulp.src('./public_html/src/scripts/vendor/*.js')
        // Error handling.
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            mangle: false,
            ecma: 6
        }))
        // Where the scripts are going to.
        .pipe(gulp.dest('./public_html/dist/scripts/vendor'))
    browserSync.reload();
});

// Compile JavaScript frameworks.

gulp.task('frameworks', function () {
    // Where the scripts are coming from.
    gulp.src('./public_html/src/scripts/vendor/frameworks/*.min.js')
        // Error handling.
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('frameworks.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
            mangle: false,
            ecma: 6
        }))
        // Where the scripts are going to.
        .pipe(gulp.dest('./public_html/dist/scripts/vendor/frameworks/'))
    browserSync.reload();
});


// Move markup to the dist folder and refresh the page.

gulp.task('html', function () {
    // Reload upon change.
    browserSync.reload();
    // Where the markup is coming from.
    gulp.src('./public_html/src/*.html')
        // Where the markup is going to.
        .pipe(gulp.dest('./public_html/dist/'))
});

// Compress and minify images when running 'gulp images' or when the default task in run.

gulp.task('images', function () {
    // Where the images are coming from.
    gulp.src('./public_html/src/assets/**')
        .pipe(imagemin())
        // Where the images are going to.
        .pipe(gulp.dest('./public_html/dist/assets/'))
})

// The default task when running 'gulp'.
gulp.task('default', function () {
    // Initialize the browser sync object.
    browserSync.init({
        // Key value pairs for browser sync settings.
        server: "./public_html/dist/",
        notify: false,
        scrollProportionally: false
    });
    gulp.start('images');
    // Watch the following tasks for change.
    gulp.watch('./public_html/src/*.html', ['html']);
    gulp.watch('./public_html/src/stylesheets/**/*.scss', ['styles']);
    gulp.watch('./public_html/src/scripts/main*.js', ['scripts']);
    gulp.watch('./public_html/src/scripts/vendor/*.js', ['vendor']);
    gulp.watch('./public_html/src/scripts/vendor/frameworks/*.min.js', ['frameworks']);
});