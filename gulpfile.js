const   gulp = require ('gulp'), // галп
        concat = require ('gulp-concat'),  // из всех в одно
        autoprefixer = require ('gulp-autoprefixer'), // автопрефиксы для стилей
        sourcemaps = require ('gulp-sourcemaps'), // карта стилей
        cleanCSS = require ('gulp-clean-css'), // минификация стилей
        del = require ('del'), // удаление файлов
        uglify = require('gulp-uglify'), // минификация javascript
        browserSync = require('browser-sync').create(), // локальный сервер
        imagemin = require('gulp-imagemin'), // сжатие изображений
        sass = require('gulp-sass'), // конвектор sass
        babel = require('gulp-babel'); // конвектор js* -> js5

sass.compiler = require('node-sass');

const config = { // место входа и выхода файлов

    enterFile: { // вход
        html: './src/*.html',
        css: './src/styles/sass/index.scss',
        cssWatch: './src/styles/**/*',
        js: './src/js/**/*.js',
        img: './src/img/**/*',
        fonts: './src/fonts'
    },
    exitFile: { // выход
        html: './dist',
        css: './dist/css',
        js: './dist/js',
        img: './dist/img',
    },
    nameFile: { // имена файлов на выходе
        css: 'all',
        js: 'all'
    },
    delPath: './dist/*' // папка для удаления

}

function style () { // функция для стилей
        return gulp.src(config.enterFile.css)
                    .pipe(sourcemaps.init())
                    .pipe(autoprefixer({
                            browsers: ['last 2 versions'],
                            cascade: false
                    }))
                    .pipe(concat(config.nameFile.css + '.css'))
                    .pipe(sass().on('error', sass.logError))
                    .pipe(cleanCSS({ level: 2 }))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(config.exitFile.css))
                    .pipe(browserSync.stream());
                
}

function script () { // функция для скриптов javaScript

        return gulp.src(config.enterFile.js)
                        .pipe(concat(config.nameFile.js + '.js'))
                        .pipe(babel({
                            presets: ['@babel/env']
                        }))
                        .pipe(uglify({
                            toplevel: true // хард сжатие
                        }))
                        .pipe(gulp.dest(config.exitFile.js))
                        .pipe(browserSync.stream());
                        
}

function html () {

        return gulp.src(config.enterFile.html)
                        .pipe(gulp.dest(config.exitFile.html))
                        .pipe(browserSync.stream());

}

function img () {

        return gulp.src(config.enterFile.img)
                        .pipe(imagemin())
                        .pipe(gulp.dest(config.exitFile.img))
                        .pipe(browserSync.stream());

}

function fonts () {

    return gulp.src(config.enterFile.fonts)
                    .pipe(gulp.dest(config.exitFile.css))

}

function watch () { 

        browserSync.init({
            server: {
                baseDir: "./dist"
            }
        });

        gulp.watch (config.enterFile.cssWatch, style);
        gulp.watch (config.enterFile.js, script);
        gulp.watch (config.enterFile.html, html);

}

function clear () {
        return del([config.delPath]);
}

gulp.task('style', style);
gulp.task('script', script);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clear, gulp.parallel(html, style, script, img))); // в работу

gulp.task('dev', gulp.series('build', 'watch')); // разработка