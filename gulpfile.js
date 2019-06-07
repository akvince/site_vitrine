'use strict';

const gulp = require('gulp');
const { dest, series, src, watch } = require('gulp');

const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');

const concaCss = () => {
  return src('./css/*.css')
    .pipe(concatCss("./css/concat/bundle.css"))
    .pipe(gulp.dest('./'));
};
exports.concaCss = concaCss;

const autoprefixer = require('gulp-autoprefixer');
const prefixCss = () => {
  return src('./css/concat/bundle.css')
  .pipe(autoprefixer({
    cascade: true
  }))
  .pipe(dest('./css/concat/'))
}
exports.prefixCss = prefixCss;

const minifyCss = () => {
  return src('./css/concat/bundle.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'));
};
exports.minifyCss = minifyCss;

exports['buildCss'] = series(concaCss, prefixCss, minifyCss);

const cssWatch = () => {
    watch([
        './css/*.css',
    ], null, series('buildCss'))
};
exports.cssWatch = cssWatch;
