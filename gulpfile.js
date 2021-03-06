const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

// running server
gulp.task('server', function () {
    // setting
    browserSync({
        server: {
            baseDir: "src"
        }
    });
    // tracking files html changes
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


// conversion sass|scss to css
gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)") // key 
        // compression format
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // rename files
        .pipe(rename({ suffix: '.min', prefix: '' }))
        // autoprefixer for all browsers
        .pipe(autoprefixer())
        // cleanCSS
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        //uploading a file
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// tracking files css changes
gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})

// starf dafault task
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));