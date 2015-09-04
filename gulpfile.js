var gulp   = require('gulp');
var ugly   = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('min', function() {
    return gulp.src('rolly-scrolly.js')
        .pipe(ugly())
        .pipe(concat('rolly-scrolly.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['min']);
