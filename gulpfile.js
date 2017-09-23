let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let changed = require('gulp-changed');
var px2rem = require('gulp-px2rem');



gulp.task('scss', function(){

    var px2remOptions = {
        replace: true,//replaces rules containing rems instead of adding fallbacks.
        rootValue: 75,//根目录字体大小
        unitPrecision: 5,//小数点保留位数
        propertyBlackList: ['font-size'],//排除的属性
        propertyWhiteList: [],
        mediaQuery: false,//Allow px to be converted in media queries.
        minPx: 1//If minimum px greater than or equal can change from px to rem.
    };

    var postCssOptions = {
        map: true
    };
    return gulp.src('src/scss/*.scss')
        .pipe(changed('dist/css', {  // dest 参数需要和 gulp.dest 中的参数保持一致
            extension: '.css'  // 如果源文件和生成文件的后缀不同，这一行不能忘
        }))
        .pipe(sass())
        .pipe(px2rem(px2remOptions,postCssOptions))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('html',function () {
   return gulp.src('src/html/*.html')
       .pipe(gulp.dest('dist/html'))
});

gulp.task('js',function () {
   return gulp.src('src/js/*.js')
       .pipe(gulp.dest('dist/js'))
});

gulp.task('libs',function () {
   return gulp.src('src/libs/**/*')
       .pipe(gulp.dest('dist/libs'))
});

gulp.task('libs',function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('watch',function () {
    gulp.watch('src/scss/*.scss',['scss']);
    gulp.watch('src/html/*.html',['html']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/libs/**/*',['libs']);
    gulp.watch('src/images/**/*',['images']);
});
