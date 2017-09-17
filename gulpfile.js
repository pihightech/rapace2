var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gulpIncludeTemplate = require("gulp-include-template"),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css');

/**
 * Minify and combine JS files, including jQuery and Bootstrap
 */
gulp.task('js', function() {
    gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('web/dist/js'));
});


gulp.task('less', function () {
   gulp.src('src/less/**/*.less')
    .pipe(less())
 //   .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('web/dist/css'));
});

/**
 * Minify and combine CSS files, including Bootstrap
 */
gulp.task('css', function() {
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/animate.css/animate.min.css',
            'src/css/**/*.css',
            'src/less/**/*.less'
        ])
  //      .pipe(minifyCSS())
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('web/dist/css'))
    ;
});

/**
 * Copy images from source to distributable
 *
 * This could be extended to create different
 * quality versions of images, or an image sprite
 */
gulp.task('images', function() {
    gulp.src([
            'src/images/**/*'
        ])
        .pipe(gulp.dest('web/dist/images'));
});


gulp.task("includeTemplate", function() {
 
    return gulp.src("src/template/index.html")
        // options is optional 
        .pipe(gulpIncludeTemplate())
        .pipe(gulp.dest("web/dist"));
});
// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'node_modules/bootstrap/dist/fonts/*'])
            .pipe(gulp.dest('web/dist/fonts/'));
});

/**
 * The default gulp task
 */
gulp.task('default', function() {
    gulp.run('js', 'css','images', 'includeTemplate', 'fonts');
});



/**
 * Watch asset files for changes. First runs default task before starting watches
 */
gulp.task('watch', function() {
    gulp.run('default');

    gulp.watch(['src/css/**/*.css', 'src/less/**/*.less'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('css');
    });


    gulp.watch('src/less/**/*.less', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('css');
    });



    gulp.watch('src/js/**/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('js');
    });

    gulp.watch('src/images/**/*', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('images');
    });

    gulp.watch('src/template/**/*.html', function(event) {
        gulp.run('includeTemplate');
    });
});
