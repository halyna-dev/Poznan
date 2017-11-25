'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cmq = require('crlab-gulp-combine-media-queries'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    cache = require('gulp-cache'),
    debug = require('gulp-debug'),
    del = require('del');

gulp.task('sass', function(){
    return gulp.src('dev/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions'], { cascade: true }))
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dev'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('dev/sass/**/*.sass', ['sass']);
    gulp.watch('dev/*.html', browserSync.reload);
    gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('dev', ['sass', 'watch', 'browser-sync']);

//*** after ***//
gulp.task('clean', function() {
        del.sync('build'); // удаляем перед сборкой старую папку
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'dev/js/main.js', // Берем js
		])
		// .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'}))// Добавляем суффикс .min
		.pipe(gulp.dest('build/js')); // Выгружаем в папку build/js
});

gulp.task('css', function() {
	return gulp.src('dev/css/*.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('build/css')); // Выгружаем в папку build/css
});

gulp.task('img', function() {
    return gulp.src('dev/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшен
});
gulp.task('build', ['clean', 'img', 'sass', 'css', 'scripts'], function() {

    var buildCss = gulp.src('dev/css/normalize****/*.css')
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css'));

    // var buildFonts = gulp.src('app/fonts/** /*') // Переносим шрифты в продакшен
    //     .pipe(gulp.dest('dist/fonts'))

    var buildHtml = gulp.src('dev/*.html') // Переносим HTML в продакшен
        .pipe(replace('css/normalize.css/normalize.css', 'css/normalize.css/normalize.min.css'))
        .pipe(replace('css/style.css', 'css/style.min.css'))
        .pipe(replace('js/main.js', 'js/main.min.js'))
        .pipe(gulp.dest('build/'));

});

// components_lib develop
gulp.task('sass', function(){
    return gulp.src('dev/components_lib/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions'], { cascade: true }))
        .pipe(gulp.dest('dev/components_lib'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dev/components_lib'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('dev/components_lib/*.sass', ['sass']);
    gulp.watch('dev/components_lib/*.html', browserSync.reload);
    gulp.watch('dev/components_lib/*.js', browserSync.reload);
});

gulp.task('lib', ['sass', 'watch', 'browser-sync']);