import gulp from 'gulp';
import eslint from 'gulp-eslint';
import webserver from 'gulp-webserver';

const config = {
    js: {
        watch: './src/*.js'
    }
};

gulp.task('js:lint', () => {

    const params = {
        useEslintrc: true
    };

    return gulp.src(config.js.watch)
               .pipe(eslint(params))
               .pipe(eslint.format())
               .pipe(eslint.failAfterError());
});

gulp.task('js:watch', () => {
    return gulp.watch(config.js.watch, ['js:lint']);
});

gulp.task('serve', () => {

    const params = {
        livereload: true,
        open: true
    };

    gulp.src('')
        .pipe(webserver(params));
});

gulp.task('default', ['js:lint', 'js:watch', 'serve']);