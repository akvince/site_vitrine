var gulp = require('gulp');
gulp.task('default', function () {
    console.log('Hello Gulp!')
});
let cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/'));
});
