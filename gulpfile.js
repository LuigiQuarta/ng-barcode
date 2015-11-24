var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var path = {
    jsFiles: 'app/**/*.js',
    dest: 'dest'
}

gulp.task('default', ['scripts']);

gulp.task('scripts', function () {
    // File da esaminare
    return gulp.src(path.jsFiles)
        // Nome file concatenato da generare
        .pipe(concat('ng-barcode.js'))
        // Dove salvarlo
        .pipe(gulp.dest(path.dest))
        // Aggiungo estensione .min.js ai file
        .pipe(rename({extname: '.min.js'}))
        // Minifico i file
        .pipe(uglify())
        // Salvo il file minificato
        .pipe(gulp.dest(path.dest));
});