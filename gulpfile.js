let gulp = require('gulp');
gulp.task('default', function () {
    console.log('Hello Gulp!')
});

let concatCss = require('gulp-concat-css');
gulp.task('concat-css', function () {
  return gulp.src('./css/*.css')
    .pipe(concatCss("./css/bundle.css"))
    .pipe(gulp.dest('./'));
});

let cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
  return gulp.src('./css/bundle.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('buildCss', gulp.series('concat-css', 'minify-css'));
