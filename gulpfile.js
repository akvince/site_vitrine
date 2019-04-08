var gulp = require('gulp');
gulp.task('default', function () {
    console.log('Hello Gulp!')
});
var concatCss = require('gulp-concat-css');
gulp.task('default', function () {
  return gulp.src('css/**/*.css')
    .pipe(concatCss("css/bundle.css"))
    .pipe(gulp.dest('out/'));
});
let cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
  return gulp.src('css/bundle.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'));
});
