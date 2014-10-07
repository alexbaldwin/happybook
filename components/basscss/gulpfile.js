
var gulp = require('gulp');
var rename = require('gulp-rename');
var mincss = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var header = require('gulp-header');

// Custom Rework wrapper
var basswork = require('gulp-basswork');

gulp.task('default', ['basswork', 'sassify']);

gulp.task('basswork', function() {
  var data = require('./package.json');
  var meta = '/*\n\n' +
             '    Basscss v' + data.version + '\n\n' +
             '    ' + data.description + '\n' +
             '    http://basscss.com' + '\n\n*/\n\n';
  gulp.src('./src/*.css')
    .pipe(basswork())
    .pipe(header(meta))
    .pipe(gulp.dest('.'))
    .pipe(mincss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('.'))
    .pipe(gzip())
    .pipe(gulp.dest('.'));
});

// Create Sass partials
gulp.task('sassify', function() {
  gulp.src('./src/modules/base.css')
    .pipe(basswork())
    .pipe(rename('_base.scss')).pipe(gulp.dest('scss'));
  gulp.src('./src/modules/utilities.css')
    .pipe(basswork())
    .pipe(rename('_utilities.scss')).pipe(gulp.dest('scss'));
  gulp.src('./src/modules/positions.css')
    .pipe(basswork())
    .pipe(rename('_positions.scss')).pipe(gulp.dest('scss'));
  gulp.src('./src/modules/grid.css')
    .pipe(basswork())
    .pipe(rename('_grid.scss')).pipe(gulp.dest('scss'));
  gulp.src('./src/modules/table-object.css')
    .pipe(basswork())
    .pipe(rename('_table-object.scss')).pipe(gulp.dest('scss'));
  gulp.src('./src/modules/color-basic.css')
    .pipe(basswork())
    .pipe(rename('_color-basic.scss')).pipe(gulp.dest('scss'));
});

// Site-specific tasks
require('./gulp/docs-tasks');

