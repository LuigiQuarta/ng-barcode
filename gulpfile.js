var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var compass = require('gulp-compass');


var path = {
    ngBarcode: {
        file: 'demo/app/ng-barcode.js',
        dist: 'dist'
    },
    scss: {
        file: 'demo/assets/scss/**/*.scss',
        config: 'config.rb',
        src: 'demo/assets/scss',
        dest: 'demo/assets/css'
    }
}


// Task per demo
gulp.task('default', ['styles', 'watch']);


// Task per ngBarcode: copy e min in 'dist'
gulp.task('dist', ['dist']);


gulp.task('dist', function () {
    // File da esaminare
    return gulp.src(path.ngBarcode.file)
        // Dove salvarlo
        .pipe(gulp.dest(path.ngBarcode.dist))
        // Aggiungo estensione .min.js ai file
        .pipe(rename({extname: '.min.js'}))
        // Minifico i file
        .pipe(uglify())
        // Salvo il file minificato
        .pipe(gulp.dest(path.ngBarcode.dist));
});


gulp.task('styles', function () {
    // File da esaminare
    return gulp.src(path.scss.file)
        .pipe(compass({
            // Leggo config.rb per compressione
            config_file: path.scss.config,
            // Path CSS
            css: path.scss.dest,
            // Path SASS
            sass: path.scss.src,
            // Mantengo i commenti
            comments: true,
            // Genero css.map
            sourcemap: true
        }))
        // Salvo in sass dest
        .pipe(gulp.dest(path.scss.dest));
});


gulp.task('watch', function () {
    // Ad ogni cambiamento del path passato, avvia da solo il task di riferimento
    gulp.watch(path.ngBarcode.file, ['dist']);
    gulp.watch(path.scss.file, ['styles']);
});