const gulp = require('gulp');
const browserify = require('browserify');
const browserifyCss = require('browserify-css');
const image = require('gulp-image');
const babelify = require('babelify');
const babel = require('babel-register');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');
const server = require('gulp-develop-server');

gulp.task('js', function () {
   return browserify({entries: './src/app.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .transform(browserifyCss)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js:watch', function () {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/**/*.css', ['js']);
});

gulp.task('image', function () {
    gulp.src('./images/*.jpg')
    .pipe(image())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('sass', function () {
    return gulp.src('./src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('test', () => {
    return gulp.src('./test/*.spec.js', {read: false})
        .pipe(mocha({
            compilers: babel,
            require: ['./setupTest.js']
        }));
});

gulp.task('server', function () {
    server.listen( { path: './index.js' } );
});

gulp.task('server:watch', function () {
    gulp.watch( [ './server.js' ], server.restart );
});

gulp.task('default', function () {
  gulp.start('sass', 'image', 'sass:watch', 'js', 'js:watch', 'server', 'server:watch');
});
