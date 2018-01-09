var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');

var FILES = [
  'countKeywords.js',
  'getTrendingKeywords.js',
  'processKeywords.js',
  'pullRelatedArticles.js',
  'pullTrendingArticles.js',
  'feedback.js'
];
var options = {
  rulePaths: ['.eslint_rules']
};

gulp.task('eslint', function () {
  return gulp.src(FILES)
    .pipe(eslint(options))
    .pipe(eslint.format());
});

gulp.task('zip', function () {
  return gulp.src(FILES)
    .pipe(zip('files.zip'))
    .pipe(gulp.dest(''));
});
