var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

gulp.task('swipeJS', function () {
    return gulp.src("bundle.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('swipe.min.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['swipeJS']);
