const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const zip = require( 'gulp-zip' );

// Create an electron-connect server to enable reloading
const electron = require('electron-connect').server.create();

gulp.task('start', ()=>{
  electron.start();
  //Watch js files and restart Electron if they change
  gulp.watch(['./app/js/*.js'], electron.restart);
  //watch css files, but only reload (no restart necessary)
  gulp.watch(['./app/scss/**/*.scss'], electron.reload);
  //watch html
  gulp.watch(['./index.html'], electron.reload);
   //watch templates
  gulp.watch(['./templates/*.html'], electron.reload);

});

gulp.task('styles', function () {
    return gulp
        .src('./app/scss/style.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('js', function () {
    return gulp.src('./app/js/*')
        .pipe(babel({
            presets : ['es2015']
        }))
        .pipe(concat('./scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/'));
});


gulp.task('clean', () => {
    return del([
        'app/css/style.css',
    ]);
});


gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['styles']);
});


// Builds files for dist

gulp.task('build-dist', function() {
   return gulp.src([
    './**/*', 
    '!node_modules/**/*', 
    '!package-lock.json',
    '!package.json',
    '!gulpfile.js'
  ])
    .pipe(gulp.dest('./dist'));
});



gulp.task('move-package', function () {
    return gulp.src('./app/package.json')
        .pipe(gulp.dest('./dist'));
});


gulp.task('move-main', function () {
    return gulp.src('./app/main.js')
        .pipe(gulp.dest('./dist'));
});



gulp.task('del-package', () => {
    return del([
      './dist/app/package.json'
    ]);
});



gulp.task('dist', gulp.series('build-dist' , 'move-main' , 'move-package'));


// Zips everything

gulp.task('zip', function () {

  return gulp.src([
    './**/*', 
    '!node_modules/**/*', 
    '!package-lock.json',
    '!gulpfile.js'
  ])

    .pipe(zip('dpTUI.zip'))
    .pipe(gulp.dest('./'));
});


gulp.task('default', gulp.series('start' , 'js' , 'clean', 'styles' , 'watch'));


