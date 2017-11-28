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
    return gulp.src('dev/sass/*.sass')
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
    gulp.watch('dev/sass/**/*.*', ['sass']);
    gulp.watch('dev/*.html', browserSync.reload);
    gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('dev', ['sass', 'watch', 'browser-sync']);

//*** from build ***//

gulp.task('clean', function() {
        del.sync('build'); // удаляем перед сборкой старую папку
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'dev/js/script.js', // Берем js
        'dev/js/slick.js' // слайдер slick-1.8.0
		])
		.pipe(concat('scripts.js')) // Собираем их в кучу в новом файле scripts.min.js
		.pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'}))// Добавляем суффикс .min
		.pipe(gulp.dest('build/js')); // Выгружаем в папку build/js
});

gulp.task('css', function() {
	return gulp.src('dev/css/*.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
        .pipe(concat('style.css'))
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('build/css')); // Выгружаем в папку build/css
});

gulp.task('img', function() {
    return gulp.src('dev/img/**/*') // Берем все изображения из img
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшен
});
gulp.task('build', ['clean', 'img', 'sass', 'css', 'scripts'], function() {

    var buildFonts = gulp.src('dev/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('build/fonts'))

    var bunners = gulp.src('dev/banners/*.*')
        .pipe(gulp.dest('build/banners'))

    var buildHtml = gulp.src('dev/*.html') // Переносим HTML в продакшен
        .pipe(replace('<link rel="stylesheet" href="css/slick.css">', ''))
        .pipe(replace('<link rel="stylesheet" href="bootstrap4_grid_only-master/bootstrap-grid.css">', ''))
        .pipe(replace('css/style.css', 'css/style.min.css'))
        .pipe(replace('js/script.js', 'js/scripts.min.js'))
        .pipe(gulp.dest('build/'));

});